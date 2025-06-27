import { CardsModel } from "@/model/CardsModel";
import { getCollection } from "@/service/CollectionService";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./CardPickerModal.module.css";

type Props = {
  email: string;
  onClose: () => void;
  onSelect: (card: CardsModel) => void;
  rarity?: string | undefined;
};

export default function CardPickerModal({
  email,
  onClose,
  onSelect,
  rarity,
}: Props) {
  const [cards, setCards] = useState<CardsModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getCollection(email, { rarity });
      setCards(data);
      setLoading(false);
    };

    if (email) fetchCards();
  }, [email, rarity]);

  return (
    <section className={styles.modal}>
      <button onClick={onClose} className={styles.modalClose}>
        ✖
      </button>
      <h2>Sélectionne une carte</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : cards.length === 0 ? (
        <p>
          Aucune carte de rareté équivalente trouvée pour procéder à un échange
        </p>
      ) : (
        <div className={styles.cardContainer}>
          {cards
            .filter((card) => card.quantity > 1)
            .map((card) => (
              <div key={card.id} onClick={() => onSelect(card)}>
                <Image
                  src={card.image_path}
                  alt={card.name}
                  height={192}
                  width={137}
                />
                <p>{card.name}</p>
                <p className={styles.quantity}>{card.quantity}</p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
