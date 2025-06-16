"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./BoosterSelection.module.css";

type BoosterModel = {
  id: string;
  name: string;
  image: string;
};

export default function BoosterSelection({
  boosters,
}: {
  boosters: BoosterModel[];
}) {
  const [selectedBooster, setSelectedBooster] = useState<BoosterModel | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (boosters.length > 0) {
      setSelectedBooster(boosters[0]);
    }
  }, [boosters]);

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
      <div>
        <button className={styles.selectButton} onClick={navigateToBoosterPage}>
          Sélectionner ce booster
        </button>
      </div>
      <div className={styles.boosterList}>
        {boosters.map((booster) => (
          <div
            key={booster.id}
            className={`${styles.boosterItem} ${
              selectedBooster?.id === booster.id
                ? styles.boosterItemSelected
                : ""
            }`}
            onClick={() => handleSelectBooster(booster)}
          >
            <img
              src={booster.image}
              alt={booster.name}
              className={styles.boosterImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
