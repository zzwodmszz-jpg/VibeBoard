import Header from "@/components/Header";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">게시판</h1>
            <p className="text-muted-foreground">
              다양한 주제로 소통하고 의견을 나눕니다.
            </p>
          </div>
          <PostList />
        </div>
      </main>
    </div>
  );
}
