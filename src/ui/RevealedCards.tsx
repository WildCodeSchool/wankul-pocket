"use client";

import styles from "./RevealedCards.module.css";
import { OpenedCard, useOpenedCards } from "@/context/OpenedCardsContext";

export default function RevealedCards() {
  const { openedCards } = useOpenedCards();

  return (
    <div className={styles.revealedCards}>
      {openedCards.map((card: OpenedCard) => (
        <div key={card.id} className={styles.card}>
          <img
            src={card.image_path}
            alt={card.name}
            className={styles.cardImage}
          />
          <h3>{card.name}</h3>
        </div>
      ))}
    </div>
  );
}
