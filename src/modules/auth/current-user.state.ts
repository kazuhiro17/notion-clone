import { User } from "@/types/note";
import { atom, useAtom } from "jotai";

const currentUserAtom = atom<User | null>(null);

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return {
    currentUser,
    set: setCurrentUser,
  };
};

