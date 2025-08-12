import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
