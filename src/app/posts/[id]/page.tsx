"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Comments from "@/components/Comments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("글 삭제에 실패했습니다.");
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error("Failed to refresh post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
              <Button onClick={() => router.push("/")} className="mt-4">
                목록으로 돌아가기
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="mb-6"
          >
            ← 목록으로
          </Button>

          <Card>
            <CardHeader>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>작성자: {post.author}</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge>조회 {post.views}</Badge>
                  <Badge variant="secondary">댓글 {post.comments?.length || 0}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-base leading-relaxed">
                  {post.content}
                </p>
              </div>

              <hr className="my-8" />

              <Comments
                postId={post.id}
                comments={post.comments}
                onCommentAdded={handleRefresh}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
