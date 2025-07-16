"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useQuestProgressContext } from "@/context/QuestProgressContext";

import styles from "./Tapbar.module.css";

export default function Tapbar() {
  const pathname = usePathname();
  const { friendRequestsCount } = useUserContext();
  const { completeableQuestsCount } = useQuestProgressContext();

  return (
    <nav
      className={pathname === "/landingpage" ? styles.none : styles.globalNav}
    >
      <ul className={styles.linksContainer}>
        <li className={styles.listItem}>
          <Link href="/collection">
            <div
              className={
                pathname === "/collection" ? styles.active : styles.image
              }
            >
              <Image
                src="/cardsIcon.png"
                alt="Collection de cartes"
                height={41}
                width={41}
              />
            </div>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/echange">
            <div
              className={pathname === "/echange" ? styles.active : styles.image}
            >
              <Image
                src="/tradeIcon.png"
                alt="Échanges de cartes"
                height={41}
                width={41}
              />
            </div>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <div className={pathname === "/" ? styles.active : styles.image}>
              <Image
                src="/homeIcon.png"
                alt="Page d'accueil"
                height={41}
                width={41}
              />
            </div>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/amis">
            <div
              className={pathname === "/amis" ? styles.active : styles.image}
            >
              <Image
                src="/friendsIcon.png"
                alt="Liste d'amis"
                height={41}
                width={41}
              />
              {friendRequestsCount > 0 && (
                <span className={styles.notificationBubbleFriends}></span>
              )}
            </div>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/objectifs">
            <div
              className={
                pathname === "/objectifs" ? styles.active : styles.image
              }
            >
              <Image
                src="/questsIcon.png"
                alt="Objectifs"
                height={41}
                width={41}
              />
              {completeableQuestsCount > 0 && (
                <span className={styles.notificationBubbleQuests}></span>
              )}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
