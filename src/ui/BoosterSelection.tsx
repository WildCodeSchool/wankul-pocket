"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BoosterModel } from "@/model/BoosterModel";
import { CardsModel } from "@/model/CardsModel";
import { InfoDroprate } from "./InfoDroprate";
import { getCardsByBoosterId } from "@/lib/getCardsByBoosterID";
import styles from "./BoosterSelection.module.css";

export default function BoosterSelection({
  boosters,
}: {
  boosters: BoosterModel[];
}) {
  const [selectedBooster, setSelectedBooster] = useState<BoosterModel | null>(
    null
  );
  const [cards, setCards] = useState<CardsModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (boosters.length > 0) {
      setSelectedBooster(boosters[0]);
    }
  }, [boosters]);

  useEffect(() => {
    if (selectedBooster) {
      const fetchCards = async () => {
        const cards = await getCardsByBoosterId(selectedBooster.id);
        setCards(cards);
      };
      fetchCards();
    }
  }, [selectedBooster]);

  const handleSelectBooster = (booster: BoosterModel) => {
    setSelectedBooster(booster);
  };

  const navigateToBoosterPage = () => {
    if (selectedBooster) {
      router.push(`/booster/${selectedBooster.id}`);
    }
  };

  return (
    <div className={styles.container}>
      {selectedBooster && (
        <div className={styles.selectedBooster}>
          <img
            src={selectedBooster.image}
            alt={selectedBooster.name}
            className={styles.selectedBoosterImage}
          />
          <h3>{selectedBooster.name}</h3>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button className={styles.selectButton} onClick={navigateToBoosterPage}>
          Sélectionner ce booster
        </button>
        <InfoDroprate cards={cards} />
      </div>
      <ul className={styles.boosterList}>
        {boosters.map((booster) => {
          const isDisabled = booster.id !== boosters[0].id;
          return (
            <li
              key={booster.id}
              className={`${styles.boosterItem} ${
                selectedBooster?.id === booster.id
                  ? styles.boosterItemSelected
                  : ""
              } ${isDisabled ? styles.disabledBooster : ""}`}
              onClick={() => {
                if (!isDisabled) {
                  handleSelectBooster(booster);
                }
              }}
              aria-disabled={isDisabled}
            >
              <img
                src={booster.image}
                alt={booster.name}
                className={styles.boosterImage}
              />
              {isDisabled && (
                <p className={styles.disabledText}>
                  Ce booster n&apos;est pas encore disponible.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
