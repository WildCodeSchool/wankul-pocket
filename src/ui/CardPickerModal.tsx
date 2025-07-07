import { CardsModel } from "@/model/CardsModel";
import { getCollection } from "@/service/CollectionService";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import styles from "./CardPickerModal.module.css";
import Loader from "./Loader";

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
  const [isPending, startTransition] = useTransition();
  const tradableCards = cards.filter((card) => card.quantity > 1);

  useEffect(() => {
    if (!email) return;

    startTransition(async () => {
      await getCollection(email, { rarity }).then((data) => {
        setCards(data);
      });
    });
  }, [email, rarity]);

  return (
    <section className={styles.modal}>
      <button onClick={onClose} className={styles.modalClose}>
        ✖
      </button>
      <h2>Sélectionne une carte</h2>
      <h3>Cartes éligibles à un échange :</h3>

      {isPending ? (
        <Loader />
      ) : tradableCards.length === 0 ? (
        <p className={styles.noCard}>
          Aucune carte de rareté équivalente trouvée pour procéder à un échange
        </p>
      ) : (
        <div className={styles.cardContainer}>
          {tradableCards
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
