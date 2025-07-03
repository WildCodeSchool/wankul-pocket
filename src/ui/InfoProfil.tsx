"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import styles from "./InfoProfil.module.css";
import { useUserContext } from "@/context/UserContext";
import { UserModel } from "@/model/UserModel";

export default function EditProfils() {
  const userContext = useUserContext();
  console.log(userContext);
  const [tempName, setTempName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      // userContext setUser for name
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          <img
            src={`${userContext.user?.profil_picture_url}`}
            alt="Avatar sélectionné"
          />
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
                  <img
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
