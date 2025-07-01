"use client";

import styles from "@/ui/HomepageCollection.module.css";
import Link from "next/link";
import { CardsModel } from "@/model/CardsModel";

export function HomepageCollection({
  collection,
}: {
  collection: CardsModel[];
}) {
  const safeCollection = Array.isArray(collection) ? collection : [];

  const sortedCollection =
    safeCollection.length === 0
      ? []
      : safeCollection
          .sort((a, b) => a.official_rate - b.official_rate)
          .slice(0, 4);

  return (
    <Link href={`/collection`} className={styles.container}>
      <div className={styles.collection}>
        <h2 className={styles.title}>Collection</h2>
        <ul className={styles.collectionList}>
          {safeCollection.length === 0
            ? [...Array(4)].map((_, i) => (
                <li key={i}>
                  <img
                    src="/cardVerso.png"
                    alt="Carte Verso"
                    className={styles.image}
                  />
                </li>
              ))
            : sortedCollection.map((item) => (
                <li key={item.id} className={styles.collectionItem}>
                  <img
                    src={item.image_path}
                    alt={item.name}
                    className={styles.image}
                  />
                </li>
              ))}
        </ul>
      </div>
    </Link>
  );
}
