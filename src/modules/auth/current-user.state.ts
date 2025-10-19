import { atom, useAtom } from 'jotai';
import { SecureUser } from './auth.repository';

// セキュアな最小限のユーザー情報のみを管理
const currentUserAtom = atom<SecureUser | null>(null);

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  
  // セキュアなログアウト処理
  const clearUser = () => {
    setCurrentUser(null);
  };
  
  return { 
    currentUser, 
    set: setCurrentUser,
    clearUser // ログアウト時に使用
  };
};