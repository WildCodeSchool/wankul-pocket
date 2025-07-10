"use client";

import { useUserContext } from "@/context/UserContext";
import { updateUsername } from "@/lib/user/updateUsername";
import { UserModel } from "@/model/UserModel";
import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./InfoProfil.module.css";
import { publicRoutes } from "@/data/ROUTES";

export default function EditProfils() {
  const userContext = useUserContext();
  const [tempName, setTempName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTempName(userContext.user?.username || "");
  }, [userContext.user?.username]);

  const handleNameSubmit = async () => {
    if (tempName.trim() && userContext.user?.email) {
      try {
        await updateUsername({
          email: userContext.user.email,
          username: tempName,
        });

        userContext.setUser({
          ...userContext.user,
          username: tempName,
        } as UserModel);
      } catch (err) {
        console.error("Erreur lors de la mise à jour du nom :", err);
      }

      setIsEditing(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          {userContext.user?.profil_picture_url && (
            <Image
              src={`${publicRoutes.PROFILS}/${userContext.user.profil_picture_url}`}
              alt="Avatar sélectionné"
              width={120}
              height={120}
              className={styles.avatarImage}
            />
          )}
        </div>

        <div className={styles.nameWrapper}>
          <div className={styles.nameRow}>
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleNameSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                autoFocus
                className={styles.inputName}
              />
            ) : (
              <>
                <p className={styles.username}>{userContext.user?.username}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editButton}
                >
                  <Image
                    src="/crayon.svg"
                    alt="Modifier le nom"
                    width={18}
                    height={18}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bubblesGroup}>
        <div>
          <div className={styles.bubble}>
            <Link href="/profil/editer-avatar" className={styles.bubbleText}>
              Changer mon avatar
            </Link>
          </div>
        </div>

        <p className={styles.sectionTitle}>Statistique</p>

        <div className={styles.bubble}>
          <GoogleDeconnexion />
        </div>
      </div>
    </div>
  );
}
