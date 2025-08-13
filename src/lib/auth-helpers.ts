"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function useAuthHelpers() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  const clientLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        setLoading(false);
        throw error;
      }

      // Update auth store immediately
      setUser(data.user);
      setLoading(false);
      
      // Navigate to private page
      router.push("/private/mypage");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const clientLogout = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        setLoading(false);
        throw error;
      }

      // Update auth store immediately
      setUser(null);
      setLoading(false);
      
      // Navigate to home
      router.push("/");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    clientLogin,
    clientLogout,
  };
}