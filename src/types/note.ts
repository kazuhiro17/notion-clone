export interface Note {
  id: number;
  displayTitle: string;
  title?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

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