"use client";

import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { publicRoutes } from "@/data/ROUTES";

export default function Header() {
  const { user } = useUserContext();
  const pathname = usePathname();

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
        <Image
          src={"/banana.png"}
          alt="Compteur de bananes"
          height={35}
          width={35}
        />
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
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
