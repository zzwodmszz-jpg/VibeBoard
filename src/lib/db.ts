import { Post, Comment } from "@/types";

let posts: Post[] = [
  {
    id: "1",
    title: "Welcome to VibeBoard",
    content: "This is the first post on VibeBoard! Feel free to share your thoughts and ideas.",
    author: "Admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    views: 150,
    comments: [
      {
        id: "c1",
        content: "Great to be here!",
        author: "User1",
        createdAt: new Date("2024-01-02"),
        postId: "1",
      },
    ],
  },
  {
    id: "2",
    title: "Next.js Tips and Tricks",
    content: "Here are some useful tips for working with Next.js...",
    author: "Developer",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    views: 98,
    comments: [],
  },
];

export const db = {
  posts: {
    getAll: () => posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),

    getById: (id: string) => posts.find((p) => p.id === id),

    create: (data: { title: string; content: string; author: string }) => {
      const newPost: Post = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content,
        author: data.author,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        comments: [],
      };
      posts.push(newPost);
      return newPost;
    },

    update: (id: string, data: { title?: string; content?: string }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return null;
      if (data.title) post.title = data.title;
      if (data.content) post.content = data.content;
      post.updatedAt = new Date();
      return post;
    },

    delete: (id: string) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return false;
      posts.splice(index, 1);
      return true;
    },

    incrementViews: (id: string) => {
      const post = posts.find((p) => p.id === id);
      if (post) post.views++;
      return post;
    },
  },

  comments: {
    addComment: (postId: string, data: { content: string; author: string }) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return null;

      const newComment: Comment = {
        id: Date.now().toString(),
        content: data.content,
        author: data.author,
        createdAt: new Date(),
        postId,
      };
      post.comments.push(newComment);
      return newComment;
    },

    deleteComment: (postId: string, commentId: string) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return false;

      const index = post.comments.findIndex((c) => c.id === commentId);
      if (index === -1) return false;
      post.comments.splice(index, 1);
      return true;
    },
  },
};
