import { CardsModel } from "@/model/CardsModel";
import { getCollection } from "@/service/CollectionService";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import styles from "./CardPickerModal.module.css";
import Loader from "./Loader";

type Props = {
  email: string;
  otherEmail: string;
  onClose: () => void;
  onSelect: (card: CardsModel) => void;
  rarity?: string | undefined;
};

export default function CardPickerModal({
  email,
  otherEmail,
  onClose,
  onSelect,
  rarity,
}: Props) {
  const [userCards, setUserCards] = useState<CardsModel[]>([]);
  const [compareCards, setCompareCards] = useState<CardsModel[]>([]);
  const [isPending, startTransition] = useTransition();
  const seasonOne: number = 1;
  const seasonTwo: number = 2;
  const tradableCards = userCards.filter((card) => card.quantity > 1);
  const seasonOneCards = tradableCards.filter(
    (card) => card.season === seasonOne
  );
  const seasonTwoCards = tradableCards.filter(
    (card) => card.season === seasonTwo
  );

  useEffect(() => {
    if (!email || !otherEmail) return;

    startTransition(() => {
      Promise.all([
        getCollection(email, { rarity }),
        getCollection(otherEmail, { rarity }),
      ]).then(([userData, otherData]) => {
        setUserCards(userData);
        setCompareCards(otherData);
      });
    });
  }, [email, otherEmail, rarity]);

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
        <div>
          <h4 className={styles.season}>Saison 1 : Origins</h4>
          <div className={styles.cardContainer}>
            {seasonOneCards.map((card) => {
              const matchingCard = compareCards.find((c) => c.id === card.id);
              return (
                <div key={card.id} onClick={() => onSelect(card)}>
                  <Image
                    src={card.image_path}
                    alt={card.name}
                    height={192}
                    width={137}
                  />
                  <p>{card.name}</p>
                  <p className={styles.quantity}>{card.quantity}</p>
                  {matchingCard && matchingCard.quantity > 0 ? (
                    <div className={styles.possession}>
                      <Image
                        src={"/cardsIcon.png"}
                        alt="Carte déjà obtenue"
                        height={20}
                        width={20}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
          <h4 className={styles.season}>Saison 2 : Campus</h4>
          <div className={styles.cardContainer}>
            {seasonTwoCards.map((card) => {
              const matchingCard = compareCards.find((c) => c.id === card.id);
              return (
                <div key={card.id} onClick={() => onSelect(card)}>
                  <Image
                    src={card.image_path}
                    alt={card.name}
                    height={192}
                    width={137}
                  />
                  <p>{card.name}</p>
                  <p className={styles.quantity}>{card.quantity}</p>
                  {matchingCard && matchingCard.quantity > 0 ? (
                    <div className={styles.possession}>
                      <Image
                        src={"/cardsIcon.png"}
                        alt="Carte déjà obtenue"
                        height={20}
                        width={20}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
