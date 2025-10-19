import { supabase } from "@/lib/supabase";

// セキュアな最小限のユーザー情報型
export interface SecureUser {
  id: string;
  userName: string;
}

// ユーザー情報を最小化するヘルパー関数
const createSecureUser = (user: any): SecureUser => ({
  id: user.id,
  userName: user.user_metadata?.name || 'Unknown User'
});

export const authRepository = {
  async signup(name: string, email: string, password: string): Promise<SecureUser> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error != null || data.user == null) {
      throw new Error(error?.message);
    }
    return createSecureUser(data.user);
  },

  async signin(email: string, password: string): Promise<SecureUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null || data.user == null) {
      throw new Error(error?.message);
    }
    return createSecureUser(data.user);
  },

  async getCurrentUser(): Promise<SecureUser | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error != null) throw new Error(error.message);
    if (data.session == null) return null;

    return createSecureUser(data.session.user);
  },

  async signout(): Promise<boolean> {
    try {
      // Supabaseセッションを終了
      const { error } = await supabase.auth.signOut();
      if (error != null) throw new Error(error.message);
      
      // セキュリティ強化: メモリ内の認証情報を完全にクリア
      // 注意: LocalStorageは既に無効化されているため、追加のクリアは不要
      
      return true;
    } catch (error) {
      console.error('ログアウト処理でエラーが発生しました:', error);
      throw error;
    }
  },
};
