"use client";

import { getOne } from "@/lib/user/getUser";
import { UserModel } from "@/model/UserModel";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  updateUserBananas: (newBananas: number) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUserBananas: () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserModel | null>(null);

  const updateUserBananas = (newBananas: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return { ...prevUser, bananas: newBananas } as UserModel;
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getOne(session.user.email);
        setUser(data);
      } catch (err) {
        console.error("Erreur fetch user context :", err);
        setUser(null);
      }
    };

    if (status === "authenticated") {
      fetchUser();
    }
  }, [session, status]);

  return (
    <UserContext
      value={{
        user,
        setUser,
        updateUserBananas,
      }}
    >
      {children}
    </UserContext>
  );
}
