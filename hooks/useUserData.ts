// hooks/useUserData.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import type { User } from "@/components/types";

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // fetch the user profile from supabase
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", firebaseUser.uid)
          .single();

        if (!error && data) {
          setUser({
  id: data.id,
  authId: data.auth_id,
  authid: data.auth_id,
  username: data.username,
  email: data.email,
  displayName: data.display_name,
  rank: data.rank ?? "Bronze",
  xp: data.xp ?? 0,
  coins: data.coins ?? 0,
  avatar: data.avatar ?? "🙂",
  totalMatches: data.totalMatches ?? 0,
  wins: data.wins ?? 0,
  winRate: data.winRate ?? 0,
});


        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
