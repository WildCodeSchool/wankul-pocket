"use client";

import Link from "next/link";
import styles from "@/ui/HomepageBoosters.module.css";
import { BoosterModel } from "@/model/BoosterModel";

export function HomepageBoosters({ boosters }: { boosters: BoosterModel[] }) {
  return (
    <Link href="/booster" className={styles.container}>
      <div className={styles.boosters}>
        <h2 className={styles.title}>Ouvrir Booster</h2>
        <ul className={styles.boosterList}>
          {boosters.map((booster) => (
            <li
              key={booster.season}
              className={`${styles.boosterItem} ${
                booster.name !== "Origins" ? styles.disabled : ""
              }`}
            >
              <img
                src={booster.image}
                alt={booster.name}
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
