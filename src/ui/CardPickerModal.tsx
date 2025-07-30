import { CardsModel } from "@/model/CardsModel";
import { getCollection } from "@/service/CollectionService";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";
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
  const [search, setSearch] = useState("");
  const seasonOne: number = 1;
  const seasonTwo: number = 2;
  const tradableCards = userCards.filter((card) => card.quantity > 1);

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

  const { seasonOneCards, seasonTwoCards } = useMemo(() => {
    const filteredCards = tradableCards.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );

    return {
      seasonOneCards: filteredCards.filter((card) => card.season === seasonOne),
      seasonTwoCards: filteredCards.filter((card) => card.season === seasonTwo),
    };
  }, [tradableCards, search]);

  return (
    <section className={styles.modal}>
      <button onClick={onClose} className={styles.modalClose}>
        ✖
      </button>
      <h2>Sélectionne une carte</h2>
      <section className={styles.forms} id="top">
        <form className={styles.searchForm}>
          <label htmlFor="Recherche">
            <Image
              src={"/loupe.png"}
              alt="Rechercher une carte"
              width={38}
              height={38}
            />
            <input
              type="text"
              placeholder="Rechercher une carte"
              value={search}
              maxLength={100}
              onChange={(e) => setSearch(e.target.value.trimStart())}
            />
          </label>
        </form>
      </section>
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
            {seasonOneCards.length > 0 ? (
              seasonOneCards.map((card) => {
                const matchingCard = compareCards.find((c) => c.id === card.id);
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => onSelect(card)}
                    initial={{ opacity: 0, scale: 0.1, translateY: -20 }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                  >
                    <Image
                      src={card.image_path}
                      alt={card.name}
                      height={192}
                      width={137}
                    />
                    <p className={styles.cardName}>{card.name}</p>
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
                  </motion.div>
                );
              })
            ) : (
              <p className={styles.noCard}>
                Aucune carte trouvée pour procéder à un échange
              </p>
            )}
          </div>
          <h4 className={styles.season}>Saison 2 : Campus</h4>
          <div className={styles.cardContainer}>
            {seasonTwoCards.length > 0 ? (
              seasonTwoCards.map((card) => {
                const matchingCard = compareCards.find((c) => c.id === card.id);
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => onSelect(card)}
                    initial={{ opacity: 0, scale: 0.1, translateY: -20 }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                  >
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
                  </motion.div>
                );
              })
            ) : (
              <p className={styles.noCard}>
                Aucune carte trouvée pour procéder à un échange
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
