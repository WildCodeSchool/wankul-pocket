import { Wankul } from "@/data/wankulList";
import Image from "next/image";
import styles from "./DisplayRandomWankul.module.css";

export function DisplayRandomWankul() {
  return (
    <div>
      <Image
        src={Wankul.Laink[Math.floor(Math.random() * Wankul.Laink.length)]}
        alt="Wankul aléatoire"
        className={styles.laink}
        height={350}
        width={350}
      />
      <Image
        src={
          Wankul.Terracid[Math.floor(Math.random() * Wankul.Terracid.length)]
        }
        alt="Wankul aléatoire"
        className={styles.terracid}
        height={350}
        width={350}
      />
    </div>
  );
}
