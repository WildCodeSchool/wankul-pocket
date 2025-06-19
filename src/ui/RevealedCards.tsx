"use client";

import styles from "./RevealedCards.module.css";
import { OpenedCard, useOpenedCards } from "@/context/OpenedCardsContext";
import { useState, useEffect } from "react";
import { useCollectionContext } from "@/context/CollectionContext";

export default function RevealedCards() {
  const { openedCards } = useOpenedCards();
  const [pageLoaded, setPageLoaded] = useState(false);
  const { collection } = useCollectionContext();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleReveal = (id: string) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
    }
  };

  return (
    <ul className={styles.revealedCards}>
      {openedCards.map((card: OpenedCard, index: number) => {
        const collectionCard = collection?.find((c) => c.id === card.id);
        const quantity = collectionCard ? collectionCard.quantity : 0;
        const camelCaseRarity = card.rarity
          .toLowerCase()
          .split(" ")
          .map((word, i) =>
            i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");
        const isRevealed = revealedIds.includes(card.id.toString());

        return (
          <li
            key={index}
            className={`${styles.card} ${pageLoaded ? styles.fadeIn : ""}`}
            style={pageLoaded ? { animationDelay: `${index * 0.12}s` } : {}}
            onClick={() => handleReveal(card.id.toString())}
          >
            <div
              className={`${styles.cardInner} ${
                isRevealed ? styles.revealed : ""
              }`}
            >
              <div className={styles.cardFront}>
                <img
                  src="/cardVerso.png"
                  alt="Card Back"
                  className={`${styles.cardImage}`}
                />
              </div>
              <div className={styles.cardBack}>
                <img
                  src={card.image_path}
                  alt={card.name}
                  className={`${styles.cardImage} ${
                    styles[camelCaseRarity] || ""
                  }`}
                />
                <p className={styles.new}>{quantity === 1 ? "NEW" : ""}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
