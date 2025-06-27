"use client";

import styles from "@/ui/HomepageCollection.module.css";
import Link from "next/link";
import { CardsModel } from "@/model/CardsModel";

export async function HomepageCollection({
  collection,
}: {
  collection: CardsModel[];
}) {
  const sortedCollection = collection
    .sort((a, b) => a.official_rate - b.official_rate)
    .slice(0, 4);

  return (
    <Link href={`/collection`}>
      <div className={styles.collectionContainer}>
        {sortedCollection.map((item) => (
          <div key={item.id} className={styles.collectionItem}>
            <img
              src={item.image_path}
              alt={item.name}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </Link>
  );
}
