"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import styles from "./CollectionContainer.module.css";

export default function CollectionContainer() {
  const { collection } = useCollectionContext();
  const seasonOneCards = Array.isArray(collection)
    ? collection.filter((card: CardsModel) => card.season === 1)
    : [];

  return (
    <section>
      <h2 className={styles.season}>Saison 1 : Origins</h2>
      <p className={styles.counter}>
        Cartes obtenues : {seasonOneCards?.length} / 180
      </p>
      {seasonOneCards?.length === 0 ? (
        <p className={styles.noCard}>
          Aucune carte de la saison 1 dans ta collection. Ouvre des boosters et
          commence à collectionner!
        </p>
      ) : (
        <ul className={styles.container}>
          {seasonOneCards?.map((card) => (
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
      )}
    </section>
  );
}
