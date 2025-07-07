"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/ui/ChoiceAvatar.module.css";
import { useUserContext } from "@/context/UserContext";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";
import { updateProfilPicture } from "@/lib/user/updateProfilPic";

type Props = { avatarList: ProfilPictureModel[] };

export default function ChoiceAvatar({ avatarList }: Props) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const userMail = user?.email;

  const [selectedAvatar, setSelectedAvatar] = useState(
    () => user?.profil_picture_url || ""
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    () => user?.profil_picture_id || 0
  );

  async function handleValidate() {
    if (!userMail) return;

    try {
      await updateProfilPicture({
        email: userMail,
        profil_picture_id: selectedAvatarId,
      });

      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          profil_picture_id: selectedAvatarId,
          profil_picture_url: selectedAvatar,
        } as typeof prevUser;
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
          <img src={selectedAvatar} alt="Avatar sélectionné" />
        </div>
      </div>

      <div className={styles.grid}>
        {avatarList.map((avatar) => (
          <img
            key={avatar.id}
            className={styles.avatarImage}
            src={avatar.image_path}
            alt="avatar"
            onClick={() => {
              setSelectedAvatarId(avatar.id);
              setSelectedAvatar(avatar.image_path);
            }}
          />
        ))}
      </div>

      <button onClick={handleValidate} className={styles.button}>
        Valider
      </button>
    </div>
  );
}
