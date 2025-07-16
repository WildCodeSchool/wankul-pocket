"use client";

import { useUserContext } from "@/context/UserContext";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { publicRoutes } from "@/data/ROUTES";
import BananaLoader from "./BananaLoader";

export default function Header() {
  const { user, friendRequestsCount } = useUserContext();
  const { completedQuestsCount } = useQuestProgressContext();
  const pathname = usePathname();

  console.log("Completed Quests Count:", completedQuestsCount);

  if (!user) {
    return (
      <header className={styles.globalHeader}>
        <Image
          src={"/headerLogo.png"}
          alt="Logo Wankul Pocket"
          height={50}
          width={125}
        />
      </header>
    );
  }
  return (
    <header className={styles.globalHeader}>
      <Link href={"/profil"} className={styles.profilLink}>
        <Image
          src={`${publicRoutes.PROFILS}/${user.profil_picture_url}`}
          alt="Avatar de profil"
          height={50}
          width={50}
        />
      </Link>
      <Link href={"/"} className={styles.headerLogo}>
        <Image
          src={"/headerLogo.png"}
          alt="Logo Wankul Pocket"
          height={50}
          width={125}
        />
      </Link>
      <Link href={"/booster"} className={styles.bananasLink}>
        <BananaLoader />
        <p>{user?.bananas}</p>
      </Link>
      <nav className={styles.headerNav}>
        <ul className={styles.linksContainer}>
          <li className={styles.listItem}>
            <Link
              href="/collection"
              className={
                pathname === "/collection" ? styles.active : styles.link
              }
            >
              Collection
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/echange"
              className={pathname === "/echange" ? styles.active : styles.link}
            >
              Echange
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/amis"
              className={pathname === "/amis" ? styles.active : styles.link}
            >
              Amis
              {friendRequestsCount > 0 && (
                <span className={styles.notificationBubble}></span>
              )}
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/objectifs"
              className={
                pathname === "/objectifs" ? styles.active : styles.link
              }
            >
              Objectifs
              {completedQuestsCount > 0 && (
                <span className={styles.notificationBubble}></span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
