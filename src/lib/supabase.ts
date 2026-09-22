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
          id: string;
          title: string;
          content: string;
          author: string;
          created_at: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author: string;
          created_at?: string;
          updated_at?: string;
          views?: number;
        };
        Update: {
          title?: string;
          content?: string;
          author?: string;
          updated_at?: string;
          views?: number;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          content: string;
          author: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          content: string;
          author: string;
          created_at?: string;
        };
        Update: {
          content?: string;
          author?: string;
        };
      };
    };
  };
};
