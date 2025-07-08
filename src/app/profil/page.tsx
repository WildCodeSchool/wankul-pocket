"use client";

import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./profil.module.css";

export default function ProfilPage() {
  const searchParams = useSearchParams();
  const avatarQuery = searchParams.get("avatar");
  const nameQuery = searchParams.get("name");

  const [avatar, setAvatar] = useState("perso 1.png");
  const [avatarName, setAvatarName] = useState("Mon avatar");

  useEffect(() => {
    if (avatarQuery) setAvatar(avatarQuery);
    if (nameQuery) setAvatarName(nameQuery);
  }, [avatarQuery, nameQuery]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBubble}>
          <Image
            src={`/profilpic/${avatar}`}
            alt="Avatar sélectionné"
            height={276}
            width={276}
          />
        </div>
        <p className={styles.username}>{avatarName}</p>
      </div>

      <div className={styles.bubblesGroup}>
        <div>
          <div className={styles.bubble}>
            <Link href="/profil/editavatar" className={styles.bubbleText}>
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
