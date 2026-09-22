"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {post.content}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="secondary">조회 {post.views}</Badge>
              <Badge variant="outline">댓글 {post.comments?.length || 0}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
