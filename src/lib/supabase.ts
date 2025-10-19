import {
  createClient,
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { Note } from '@/modules/notes/note.entity';

// LocalStorageを無効化したセキュアなSupabaseクライアント
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  {
    auth: {
      // LocalStorageを無効化し、メモリベースの認証に変更
      storage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      },
      // セッションの永続化を無効化
      persistSession: false,
      // 自動リフレッシュを無効化
      autoRefreshToken: false,
      // セッション検出を無効化
      detectSessionInUrl: false
    }
  }
);

export const subscribe = (
  userId: string,
  callback: (payload: RealtimePostgresChangesPayload<Note>) => void
) => {
  return supabase
    .channel('notes-changes')
    .on<Note>(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notes',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

export const unsubscribe = (channel: RealtimeChannel) => {
  supabase.removeChannel(channel);
};