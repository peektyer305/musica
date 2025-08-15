import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("app")
    .from("Posts")
    .select(`*, Users(name, icon_url, client_id)`)
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, music_url } = await request.json();

    // Validate required fields
    if (!title || !content || !music_url) {
      return NextResponse.json(
        { error: "Title, content, and music URL are required" }, 
        { status: 400 }
      );
    }

    const { data: appUser, error:dbError } = await supabase.schema("app").from("Users").select().eq("private_id", user.id).single();
    if (dbError || !appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Insert the post
    const { data, error } = await supabase
      .schema("app")
      .from("Posts")
      .insert([
        {
          title,
          content,
          music_url,
          user_id: appUser.id,
        }
      ])
      .select(`*, Users(name, icon_url, client_id)`)
      .single();

    if (error) {
      console.error("Error creating post:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Get the app user to check ownership
    const { data: appUser, error: dbError } = await supabase.schema("app").from("Users").select().eq("private_id", user.id).single();
    if (dbError || !appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the post exists and belongs to the user
    const { data: post, error: postError } = await supabase
      .schema("app")
      .from("Posts")
      .select("user_id")
      .eq("id", postId)
      .single();

    if (postError) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.user_id !== appUser.id) {
      return NextResponse.json({ error: "Not authorized to delete this post" }, { status: 403 });
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .schema("app")
      .from("Posts")
      .delete()
      .eq("id", postId);

    if (deleteError) {
      console.error("Error deleting post:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
