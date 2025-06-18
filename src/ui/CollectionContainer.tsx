"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import { useState } from "react";
import CardModal from "./CardModal";
import styles from "./CollectionContainer.module.css";

export default function CollectionContainer() {
  const { collection } = useCollectionContext();
  const [selectedCard, setSelectedCard] = useState<CardsModel | null>(null);

  return (
    <section>
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
      <h2 className={styles.season}>Saison 1 : Origins</h2>
      <p className={styles.counter}>
        Cartes obtenues : {collection?.length} / 180
      </p>
      <ul className={styles.container}>
        {collection
          ?.filter((card) => card.season === 1)
          .map((card: CardsModel) => (
            <li
              key={card.id}
              className={styles.cardItem}
              onClick={() => {
                setSelectedCard(card);
              }}
            >
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
