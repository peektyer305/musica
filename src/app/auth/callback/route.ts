import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    console.log("Auth code received:", code);
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    data && console.log("Auth code exchange data:", data);
    if (!error) {
      // Revalidate the layout to trigger getCurrentUser in client components
      revalidatePath("/", "layout");

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
