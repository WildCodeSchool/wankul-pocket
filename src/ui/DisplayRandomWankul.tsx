import styles from "./DisplayRandomWankul.module.css";
import { Wankul } from "@/data/wankulList";

export function DisplayRandomWankul() {
  return (
    <div>
      <img
        src={Wankul.Laink[Math.floor(Math.random() * Wankul.Laink.length)]}
        alt="Wankul aléatoire"
        className={styles.laink}
      />
      <img
        src={
          Wankul.Terracid[Math.floor(Math.random() * Wankul.Terracid.length)]
        }
        alt="Wankul aléatoire"
        className={styles.terracid}
      />
    </div>
  );
}
