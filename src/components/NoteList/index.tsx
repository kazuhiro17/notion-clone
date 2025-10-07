import { cn } from "@/lib/utils";
import { NoteItem } from "./NoteItem";
import { useNoteStore } from "@/modules/notes/note.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

interface NoteListProps {
  layer?: number;
  parentId?: number;
}

export function NoteList({ layer = 0, parentId }: NoteListProps) {
  // void parentId;
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const { currentUser } = useCurrentUserStore();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.stopPropagation();
    if (!currentUser?.id) return;
    const newNote = await noteRepository.create(currentUser.id, {
      parentId,
    });
    noteStore.set([newNote]);
  };

  const fetchChildren = async(e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    const children = await noteRepository.find(currentUser!.id, note.id);
    if (children == null) return;
    noteStore.set(children);
  };

  return (
    <>
      <p
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          layer === 0 && "hidden"
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
      >
        ページがありません
      </p>
      {notes
      .map((note) => {
        return (
          <div key={note.id}>
            <NoteItem
              note={note}
              layer={layer}
              onExpand={(e: React.MouseEvent) => fetchChildren(e, note)}
              onCreate={(e) => createChild(e, note.id)}
            />
          </div>
        );
      })}
    </>
  );
}
