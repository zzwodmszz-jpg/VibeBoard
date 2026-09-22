"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            VibeBoard
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition">
              게시판
            </Link>
          </nav>
        </div>
        <Button asChild>
          <Link href="/posts/new">새 글 쓰기</Link>
        </Button>
      </div>
    </header>
  );
}
