"use client";

import { UserModel } from "@/model/UserModel";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserModel | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/users/${session.user.email}`);
        const data: UserModel = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erreur fetch user context :", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUser();
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
