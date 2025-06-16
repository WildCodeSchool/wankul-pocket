import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.globalHeader}>
      <Link href={"/Profil"} className={styles.link}>
        <Image
          src={"/banana.png"}
          alt="Avatar de profil"
          height={50}
          width={50}
        />
      </Link>
      <Image
        src={"/headerLogo.png"}
        alt="Logo Wankul Pocket"
        height={50}
        width={125}
      />
      <Link href={"/Booster"} className={styles.link}>
        <Image
          src={"/banana.png"}
          alt="Compteur de bananes"
          height={50}
          width={50}
        />
        <p>{}</p>
      </Link>
    </header>
  );
}
