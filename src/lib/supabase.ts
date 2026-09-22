import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string; // UUID
          title: string;
          content: string;
          author: string;
          created_at: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          title: string;
          content: string;
          author: string;
        };
        Update: {
          title?: string;
          content?: string;
          author?: string;
          views?: number;
        };
      };
      comments: {
        Row: {
          id: string; // UUID
          post_id: string; // UUID
          content: string;
          author: string;
          created_at: string;
        };
        Insert: {
          post_id: string; // UUID
          content: string;
          author: string;
        };
        Update: {
          content?: string;
          author?: string;
        };
      };
    };
  };
};
