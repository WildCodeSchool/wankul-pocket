"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editavatar.module.css";
import { avatarList } from "@/data/avatarList";

export default function EditAvatarPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState("perso 1.png");
  const [avatarName, setAvatarName] = useState("");

  const handleValidate = () => {
    if (!avatarName.trim()) {
      alert("Entre un nom pour ton avatar !");
      return;
    }

    router.push(
      `/profil?avatar=${encodeURIComponent(
        selectedAvatar
      )}&name=${encodeURIComponent(avatarName)}`
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          <img src={`/profilpic/${selectedAvatar}`} alt="Avatar sélectionné" />
        </div>
        <p className={styles.username}>{avatarName || "Nom de l’avatar"}</p>
      </div>

      <input
        type="text"
        placeholder="Nom de ton avatar"
        value={avatarName}
        onChange={(e) => setAvatarName(e.target.value)}
        className={styles.input}
      />

      <div className={styles.grid}>
        {avatarList.map((avatar) => (
          <img
            key={avatar}
            src={`/profilpic/${avatar}`}
            alt={avatar}
            onClick={() => setSelectedAvatar(avatar)}
            className={styles.avatarImage}
          />
        ))}
      </div>

      <button className={styles.button} onClick={handleValidate}>
        Valider
      </button>
    </div>
  );
}
