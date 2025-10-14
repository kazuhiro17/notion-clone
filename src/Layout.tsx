import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { SearchModal } from "./components/SearchModal";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { useNoteStore } from "./modules/notes/note.state";
import { useEffect, useState } from "react";
import { noteRepository } from "./modules/notes/note.repository";
import { unsubscribe } from "diagnostics_channel";

const Layout = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
    const channel = subscribeNotes();
    return () => {
      unsubscribe(channel!);
    };
  }, []);

  const subscribeNotes = () => {
    if (currentUser === null) return;
    return subscribe(currentUser.id, (payload) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        noteStore.set([payload.new]);
      } else if (payload.eventType === "DELETE") {
        noteStore.delete(payload.old.id);
      }
    });
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  };

  const searchNotes = async (keyword: string) => {
    const notes = await noteRepository.findByKeyword(currentUser!.id, keyword);
    if (notes == null) return;
    noteStore.set(notes);
    setSearchResults(notes ?? []);
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
    setIsShowModal(false);
  };

  if (currentUser === null) {
    return <Navigate replace to="/signin" />;
  }

  return (
    <div className="h-full flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResults}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
