"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/ui/ChoiceAvatar.module.css";
import { useUserContext } from "@/context/UserContext";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";
import { updateProfilPicture } from "@/lib/user/updateProfilPic";
import { UserModel } from "@/model/UserModel";
import { publicRoutes } from "@/data/ROUTES";

type Props = { avatarList: ProfilPictureModel[] };

export default function ChoiceAvatar({ avatarList }: Props) {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const [selectedAvatar, setSelectedAvatar] = useState<{
    id: number;
    url: string;
  }>(() => {
    if (user?.profil_picture_id && user.profil_picture_url) {
      return {
        id: user.profil_picture_id,
        url: user.profil_picture_url,
      };
    } else if (avatarList.length > 0) {
      return {
        id: avatarList[0].id,
        url: avatarList[0].image_path,
      };
    } else {
      return { id: 0, url: "default.png" };
    }
  });

  async function handleValidate() {
    if (!user?.email) return;

    try {
      await updateProfilPicture({
        email: user.email,
        profil_picture_id: selectedAvatar.id,
      });

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          profil_picture_id: selectedAvatar.id,
          profil_picture_url: selectedAvatar.url,
        } as UserModel;
      });

      router.push("/profil");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar :", error);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          <Image
            src={`${publicRoutes.PROFILS}/${selectedAvatar.url}`}
            alt="Avatar sélectionné"
            width={120}
            height={120}
            className={styles.avatarImage}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {avatarList.map((avatar) => (
          <Image
            key={avatar.id}
            className={styles.avatarImage}
            src={`${publicRoutes.PROFILS}/${avatar.image_path}`}
            alt={`Avatar ${avatar.id}`}
            width={100}
            height={100}
            onClick={() =>
              setSelectedAvatar({
                id: avatar.id,
                url: avatar.image_path,
              })
            }
          />
        ))}
      </div>

      <button onClick={handleValidate} className={styles.button}>
        Valider
      </button>
    </div>
  );
}
