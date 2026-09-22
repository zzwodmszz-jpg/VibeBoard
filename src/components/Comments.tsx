"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Comment } from "@/types";

interface CommentsProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

export default function Comments({ postId, comments, onCommentAdded }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || !author.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, author }),
      });

      if (response.ok) {
        setNewComment("");
        setAuthor("");
        onCommentAdded();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">댓글 ({comments.length})</h3>

        <div className="space-y-3 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-background border rounded-lg space-y-3">
          <Input
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleAddComment}
            disabled={loading || !newComment.trim() || !author.trim()}
            className="w-full"
          >
            {loading ? "등록 중..." : "댓글 등록"}
          </Button>
        </div>
      </div>
    </div>
  );
}
