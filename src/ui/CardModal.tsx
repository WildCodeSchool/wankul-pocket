import { CardsModel } from "@/model/CardsModel";
import styles from "./CardModal.module.css";
import CardWithAnim from "./CardWithAnim";

type CardModalProps = {
  card: CardsModel;
  onClose: () => void;
};

export default function CardModal({ card, onClose }: CardModalProps) {
  return (
    <section className={styles.modal}>
      <button
        onClick={onClose}
        className={styles.closeBtn}
        aria-label="Close modal"
      >
        ✖
      </button>
      <CardWithAnim card={card} />
      <div className={styles.cardInfo}>
        <h2>{card.name}</h2>
        <p className={styles.quote}>{card.quote}</p>
        <p>Rareté : {card.rarity}</p>
        <p>Clan : {card.clan}</p>
        {card.quantity === 1 ? (
          <p>Possédée en {card.quantity} exemplaire</p>
        ) : (
          <p>Possédée en {card.quantity} exemplaires</p>
        )}
      </div>
    </section>
  );
}
