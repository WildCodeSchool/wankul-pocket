"use client";

import styles from "@/ui/HomepageCollection.module.css";
import Link from "next/link";
import { CardsModel } from "@/model/CardsModel";

export function HomepageCollection({
  collection,
}: {
  collection: CardsModel[];
}) {
  const sortedCollection = collection
    .sort((a, b) => a.official_rate - b.official_rate)
    .slice(0, 4);

  return (
    <Link href={`/collection`} className={styles.container}>
      <div className={styles.collection}>
        <h2 className={styles.title}>Collection</h2>
        <ul className={styles.collectionList}>
          {sortedCollection.map((item) => (
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
