export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  views: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  created_at: string;
  post_id: string;
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
