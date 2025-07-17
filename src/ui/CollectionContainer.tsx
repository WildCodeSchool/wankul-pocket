"use client";

import { CardsModel } from "@/model/CardsModel";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import CardModal from "./CardModal";
import styles from "./CollectionContainer.module.css";

type Props = {
  collection: CardsModel[];
};

export default function CollectionContainer({ collection }: Props) {
  const [selectedCard, setSelectedCard] = useState<CardsModel | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rarity-asc");
  const seasonOne: number = 1;
  const filteredCards = useMemo(() => {
    const seasonOneCards = Array.isArray(collection)
      ? collection.filter((card: CardsModel) => card.season === seasonOne)
      : [];
    return seasonOneCards
      .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        switch (sort) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "rarity-asc":
            return a.card_number - b.card_number;
          case "rarity-desc":
            return b.card_number - a.card_number;
          case "quantity-asc":
            return a.quantity - b.quantity;
          case "quantity-desc":
            return b.quantity - a.quantity;
          default:
            return 0;
        }
      });
  }, [collection, search, sort]);

  return (
    <>
      <section className={styles.forms}>
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
        <form className={styles.sortForm}>
          <label htmlFor="sort">Trier par : </label>
          <select
            name="sort"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name-asc">Nom &uarr;</option>
            <option value="name-desc">Nom &darr;</option>
            <option value="rarity-asc">Rareté &uarr;</option>
            <option value="rarity-desc">Rareté &darr;</option>
            <option value="quantity-asc">Quantité &uarr;</option>
            <option value="quantity-desc">Quantité &darr;</option>
          </select>
        </form>
      </section>
      <section>
        {selectedCard && (
          <CardModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
        <h2 className={styles.season}>Saison 1 : Origins</h2>
        <p className={styles.counter}>
          Cartes obtenues : {filteredCards?.length} / 180
        </p>
        {filteredCards.length === 0 ? (
          <p className={styles.noCard}>
            Aucune carte ne correspond à ta recherche. Ouvre des boosters et
            commence à collectionner!
          </p>
        ) : (
          <ul className={styles.container}>
            {filteredCards.map((card) => (
              <motion.li
                key={card.id}
                className={styles.cardItem}
                onClick={() => setSelectedCard(card)}
                initial={{ opacity: 0, scale: 0.1, translateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
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
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
