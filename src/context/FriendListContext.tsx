"use client";

import { useUserContext } from "./UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { getEveryFriends } from "@/service/FriendsService";
import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
  useCallback,
} from "react";

type FriendListContextType = {
  friends: FriendsModel[];
  setFriends: React.Dispatch<React.SetStateAction<FriendsModel[]>>;
  removeFriend: (friendId: number) => void;
  refreshFriends: () => Promise<void>;
};

const FriendListContext = createContext<FriendListContextType | undefined>(
  undefined
);

export const useFriendListContext = () => {
  const context = useContext(FriendListContext);
  if (!context) {
    throw new Error(
      "useFriendListContext must be used within a FriendListProvider"
    );
  }
  return context;
};

export const FriendListProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<FriendsModel[]>([]);

  const fetchFriends = useCallback(async () => {
    if (!userProfilId) return;

    try {
      const friendsList = await getEveryFriends(userProfilId);
      setFriends(friendsList);
    } catch (error) {
      console.error("Error fetching friends:", error);
      setFriends([]);
    }
  }, [userProfilId]);

  const removeFriend = useCallback((friendId: number) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
  }, []);

  const refreshFriends = useCallback(async () => {
    await fetchFriends();
  }, [fetchFriends]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const value = {
    friends,
    setFriends,
    removeFriend,
    refreshFriends,
  };

  return <FriendListContext value={value}>{children}</FriendListContext>;
};
