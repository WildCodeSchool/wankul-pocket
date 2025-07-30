"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { useUserContext } from "@/context/UserContext";
import { publicRoutes } from "@/data/ROUTES";
import { updateUsername } from "@/lib/user/updateUsername";
import { UserModel } from "@/model/UserModel";
import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./InfoProfil.module.css";

export default function EditProfils() {
  const userContext = useUserContext();
  const [tempName, setTempName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { collection } = useCollectionContext();
  const cardsByRarity =
    collection.reduce((acc, card) => {
      acc[card.rarity] = (acc[card.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
  const USERNAME_MAX_LENGTH: number = 25;

  useEffect(() => {
    setTempName(userContext.user?.username || "");
  }, [userContext.user?.username]);

  const handleCopy = async () => {
    const friendCode = userContext.user?.profil_id || "";
    if (!navigator.clipboard) {
      alert(
        "La fonctionnalité de copie n'est pas disponible dans votre navigateur."
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(friendCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };

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

  const handleAvatarEdit = () => {
    router.push("/profil/editer-avatar");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          {userContext.user?.profil_picture_url && (
            <Image
              src={`${publicRoutes.PROFILS}/${userContext.user.profil_picture_url}`}
              alt="Avatar sélectionné"
              width={248}
              height={248}
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
                maxLength={USERNAME_MAX_LENGTH}
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
                    width={16}
                    height={16}
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
            <button onClick={handleAvatarEdit} className={styles.bubbleText}>
              Changer mon avatar
            </button>
          </div>
        </div>
        <div className={styles.codeContainer}>
          <h2>Code ami</h2>
          <p className={styles.friendCode}>
            {copied ? (
              <span className={styles.notif}>Code ami copié!</span>
            ) : (
              <span className={styles.code}>{userContext.user?.profil_id}</span>
            )}
            <button onClick={handleCopy}>Copier</button>
          </p>
        </div>

        <div className={styles.stats}>
          <h2 className={styles.sectionTitle}>Statistiques</h2>
          <p className={styles.total}>
            <strong>Cartes possédées </strong>: {collection.length}
          </p>
          {Object.entries(cardsByRarity).map(([rarity, count]) => (
            <p key={rarity}>
              <strong>{rarity}:</strong> &nbsp;{count}
            </p>
          ))}
        </div>
        <div className={styles.bubble}>
          <GoogleDeconnexion />
        </div>
      </div>
    </div>
  );
}
