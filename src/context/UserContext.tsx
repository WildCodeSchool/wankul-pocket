"use client";

import { getOne } from "@/lib/user/getUser";
import { UserModel } from "@/model/UserModel";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllRequests } from "@/service/FriendsService";

type UserContextType = {
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  updateUserBananas: (newBananas: number) => void;
  friendRequestsCount: number;
  refreshFriendRequests: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUserBananas: () => {},
  friendRequestsCount: 0,
  refreshFriendRequests: () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserModel | null>(null);
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);

  const updateUserBananas = (newBananas: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return { ...prevUser, bananas: newBananas } as UserModel;
    });
  };

  const refreshFriendRequests = async () => {
    if (!user?.profil_id) return;

    try {
      const requests = await getAllRequests(user.profil_id);
      setFriendRequestsCount(requests.length);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des demandes d'amis :",
        error
      );
      setFriendRequestsCount(0);
    }
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

  useEffect(() => {
    if (user?.profil_id) {
      refreshFriendRequests();
    }
  }, [user]);

  return (
    <UserContext
      value={{
        user,
        setUser,
        updateUserBananas,
        friendRequestsCount,
        refreshFriendRequests,
      }}
    >
      {children}
    </UserContext>
  );
}
