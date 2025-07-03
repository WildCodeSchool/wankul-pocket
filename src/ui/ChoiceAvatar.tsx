"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/ui/ChoiceAvatar.module.css";
import { useUserContext } from "@/context/UserContext";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";
import { UserModel } from "@/model/UserModel";
import { updateProfilPicture } from "@/lib/user/updateProfilPic";

interface UpdateProfilPicture {
  profil_picture_id: number | null;
  email: string | undefined;
}

type Props = { avatarList: ProfilPictureModel[] };

export default function ChoiceAvatar({ avatarList }: Props) {
  const { user, updateProfilePicture } = useUserContext();
  const router = useRouter();
  const userMail = user?.email;
  const [selectedAvatar, setSelectedAvatar] = useState(
    () => user?.profil_picture_url || ""
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1);

  async function handleValidate() {
    try {
      updateProfilePicture(selectedAvatarId, selectedAvatar);
      router.push("/profil");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar :", error);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          <img src={`${selectedAvatar}`} alt="Avatar sélectionné" />
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
              console.log("Avatar sélectionné :", avatar.image_path);
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
