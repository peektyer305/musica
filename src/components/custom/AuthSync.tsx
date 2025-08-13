"use client";

import { useAuthStore } from "@/stores/authStore";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function AuthSync() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    let cancelled = false;
    (async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) {
        setUser(user ?? null);
        setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email);
      
      // Handle different auth events
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.email);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setLoading(false);
      }
      
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [router, setUser, setLoading]);

  return null;
}
