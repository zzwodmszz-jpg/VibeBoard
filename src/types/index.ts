export interface Post {
  id: string; // UUID
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  views: number;
  comments?: Comment[];
}

export interface Comment {
  id: string; // UUID
  content: string;
  author: string;
  created_at: string;
  post_id: string; // UUID
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}
