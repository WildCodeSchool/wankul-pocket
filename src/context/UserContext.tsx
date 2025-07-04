"use client";

import { getOne } from "@/lib/user/getUser";
import { updateProfilPicture } from "@/lib/user/updateProfilPic";
import { UserModel } from "@/model/UserModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  updateUserBananas: (newBananas: number) => void;
  updateProfilePicture: (
    profil_picture_id: number,
    profil_picture_url: string
  ) => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUserBananas: () => {},
  updateProfilePicture: async () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserModel | null>(null);
  const router = useRouter();

  const updateUserBananas = (newBananas: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return { ...prevUser, bananas: newBananas } as UserModel;
    });
  };

  const updateProfilePicture = async (
    profil_picture_id: number,
    profil_picture_url: string
  ) => {
    if (!user?.email) return;
    try {
      await updateProfilPicture({
        profil_picture_id,
        email: user.email,
      });
      setUser((prevUser) =>
        prevUser
          ? ({
              ...prevUser,
              profil_picture_id,
              profil_picture_url,
            } as UserModel)
          : prevUser
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar :", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) {
        return;
      }

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
      value={{ user, setUser, updateUserBananas, updateProfilePicture }}
    >
      {children}
    </UserContext>
  );
}
