import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("Fetching posts...");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    // Get all posts
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Supabase response:", { posts, error });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // For each post, get comments
    if (posts && posts.length > 0) {
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const { data: comments } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", post.id)
            .order("created_at", { ascending: true });

          return {
            ...post,
            comments: comments || [],
          };
        })
      );
      return NextResponse.json(postsWithComments);
    }

    return NextResponse.json(posts || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, author }])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ...data, comments: [] }, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
