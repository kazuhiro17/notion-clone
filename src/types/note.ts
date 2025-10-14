import { Note as NoteEntity } from "@/modules/notes/note.entity";

export type Note = NoteEntity & {
  displayTitle?: string;
};

export interface User {
  id: string;
  aud: string;
  email?: string;
  user_metadata: {
    name?: string;
  };
  app_metadata: Record<string, any>;
  created_at: string;
}