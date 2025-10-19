import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Home } from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // セキュアな認証状態の初期化
      const currentUser = await authRepository.getCurrentUser();
      currentUserStore.set(currentUser);
    } catch (error) {
      // 認証エラーの場合はユーザーをnullに設定
      console.warn("認証状態の初期化に失敗しました:", error);
      currentUserStore.set(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
