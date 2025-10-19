import {
  createClient,
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { Note } from '@/modules/notes/note.entity';

// LocalStorageを完全に無効化したセキュアなSupabaseクライアント
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  {
    auth: {
      // LocalStorageを完全に無効化
      storage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      },
      // セッションの永続化を完全に無効化
      persistSession: false,
      // 自動リフレッシュを完全に無効化
      autoRefreshToken: false,
      // セッション検出を完全に無効化
      detectSessionInUrl: false,
      // ストレージキーのプレフィックスを無効化
      storageKey: 'disabled'
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