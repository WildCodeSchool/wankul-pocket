"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Tapbar.module.css";

export default function Tapbar() {
  const pathname = usePathname();
  return (
    <nav className={styles.globalNav}>
      <ul className={styles.linksContainer}>
        <li className={styles.listItem}>
          <Link href="/cards">
            <div
              className={pathname === "/cards" ? styles.active : styles.image}
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
          <Link href="/trade">
            <div
              className={pathname === "/trade" ? styles.active : styles.image}
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
          <Link href="/friends">
            <div
              className={pathname === "/friends" ? styles.active : styles.image}
            >
              <Image
                src="/friendsIcon.png"
                alt="Liste d'amis"
                height={41}
                width={41}
              />
            </div>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/quests">
            <div
              className={pathname === "/quests" ? styles.active : styles.image}
            >
              <Image
                src="/questsIcon.png"
                alt="Objectifs"
                height={41}
                width={41}
              />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
