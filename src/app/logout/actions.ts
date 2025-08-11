"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to log out');
  }

  // Optionally, you can redirect or revalidate the path after logout
  // revalidatePath('/', 'layout');
    // redirect('/');
    revalidatePath("/", 'layout');
    redirect('/');
}