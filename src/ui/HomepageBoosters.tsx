"use client";

import { BoosterModel } from "@/model/BoosterModel";
import styles from "@/ui/HomepageBoosters.module.css";
import Image from "next/image";
import Link from "next/link";

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
                booster.name !== "Origins" && booster.name !== "Campus"
                  ? styles.disabled
                  : ""
              }`}
            >
              <Image
                src={booster.image}
                alt={booster.name}
                className={styles.image}
                height={200}
                width={120}
              />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
