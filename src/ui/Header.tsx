import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.globalHeader}>
      <Link href={""}></Link>
      <Image
        src={"/headerLogo.png"}
        alt="Logo Wankul Pocket"
        height={50}
        width={125}
      />
      <Link href={""}></Link>
    </header>
  );
}
