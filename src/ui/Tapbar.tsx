"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Tapbar.module.css";

export default function Tapbar() {
  const pathname = usePathname();
  console.log("Pathname:", pathname);
  console.log(
    "Applied class:",
    pathname === "/LandingPage" ? styles.none : styles.globalNav
  );

  return (
    <nav
      className={pathname === "/LandingPage" ? styles.none : styles.globalNav}
    >
      <ul className={styles.linksContainer}>
        <li className={styles.listItem}>
          <Link href="/Collection">
            <div
              className={
                pathname === "/Collection" ? styles.active : styles.image
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
          <Link href="/Echange">
            <div
              className={pathname === "/Echange" ? styles.active : styles.image}
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
          <Link href="/Homepage">
            <div
              className={
                pathname === "/Homepage" ? styles.active : styles.image
              }
            >
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
          <Link href="/Amis">
            <div
              className={pathname === "/Amis" ? styles.active : styles.image}
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
          <Link href="/Objectifs">
            <div
              className={
                pathname === "/Objectifs" ? styles.active : styles.image
              }
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
