import styles from "./InfoDroprate.module.css";
import { useState } from "react";
import { CardsModel } from "@/model/CardsModel";

const RARITY_CONFIG = [
  {
    rate: "45.00",
    title: "Commune",
    percentage: "45%",
    className: styles.card45,
  },
  {
    rate: "30.00",
    title: "Peu Commune",
    percentage: "30%",
    className: styles.card30,
  },
  { rate: "10.00", title: "Rare", percentage: "10%", className: styles.card10 },
  {
    rate: "2.24",
    title: "Ultra Rare Holo 1",
    percentage: "2.24%",
    className: styles.card2_24,
  },
  {
    rate: "1.60",
    title: "Ultra Rare Holo 2",
    percentage: "1.60%",
    className: styles.card1_60,
  },
  {
    rate: "0.80",
    title: "Légendaire Bronze",
    percentage: "0.80%",
    className: styles.card0_80,
  },
  {
    rate: "0.28",
    title: "Légendaire Argent",
    percentage: "0.28%",
    className: styles.card0_28,
  },
  {
    rate: "0.08",
    title: "Légendaire Or",
    percentage: "0.08%",
    className: styles.card0_08,
  },
];

export function InfoDroprate({ cards }: { cards: CardsModel[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const getCardsByRate = (rate: string) =>
    cards.filter((card) => Number(card.official_rate).toFixed(2) === rate);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Infos</button>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>
                Informations sur les taux de drop
              </h2>

              {RARITY_CONFIG.map(({ rate, title, percentage, className }) => {
                const filteredCards = getCardsByRate(rate);

                return (
                  <div key={rate} className={styles.containerCards}>
                    <h3>
                      {title} ({percentage})
                    </h3>
                    <ul className={className}>
                      {filteredCards.map((card) => (
                        <li key={card.id}>
                          <img
                            src={card.image_path}
                            alt={card.name}
                            className={styles.cardImage}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
