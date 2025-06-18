"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import styles from "./CollectionContainer.module.css";

export default function CollectionContainer() {
  const { collection } = useCollectionContext();

  return (
    <section>
      <h2 className={styles.season}>Saison 1 : Origins</h2>
      <ul className={styles.container}>
        {collection
          ?.filter((card) => card.season === 1)
          .map((card: CardsModel) => (
            <li key={card.id} className={styles.cardItem}>
              <Image
                src={card.image_path}
                alt={card.name}
                width={150}
                height={209}
              />
              <div className={styles.quantity}>
                <p>{card.quantity}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
