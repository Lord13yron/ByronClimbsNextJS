"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/supabaseClient";

export default function SupabaseAuthListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // This will parse the URL fragment and persist the session in cookies/localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Optionally, you can redirect or refresh the page
        router.refresh();
      }
    });
  }, [router]);

  return null;
}
