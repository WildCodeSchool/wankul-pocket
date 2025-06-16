"use client";

import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useUserContext();

  console.log(user);
  if (!user) {
    return (
      <header className={styles.globalHeader}>
        <Link href={"/homepage"}>
          <Image
            src={"/headerLogo.png"}
            alt="Logo Wankul Pocket"
            height={50}
            width={125}
          />
        </Link>
      </header>
    );
  }
  return (
    <header className={styles.globalHeader}>
      <Link href={"/profil"} className={styles.profilLink}>
        <Image
          src={user?.profil_picture_url}
          alt="Avatar de profil"
          height={50}
          width={50}
        />
      </Link>
      <Link href={"/homepage"}>
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
    </header>
  );
}
