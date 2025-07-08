"use client";

import { useOpenedCards } from "@/context/OpenedCardsContext";
import { useUserContext } from "@/context/UserContext";
import { getBoosterOpening } from "@/lib/openBooster/getBoosterOpening";
import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./OpenBoosterButton.module.css";

interface OpenBoosterButtonProps {
  boosterId: number;
}

export default function OpenBoosterButton({
  boosterId,
}: OpenBoosterButtonProps) {
  const router = useRouter();
  const { user, updateUserBananas } = useUserContext();
  const { updateOpenedCards } = useOpenedCards();

  const handleOpening = async () => {
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const boosterCost = 10;

    if (user.bananas >= boosterCost) {
      try {
        updateUserBananas(user.bananas - boosterCost);
        const cards = await getBoosterOpening(boosterId, user.id, user.email);

        const formattedCards: CardsModel[] = cards;
        updateOpenedCards(formattedCards);

        router.push(`/booster/${boosterId}/reveal`);
      } catch (error) {
        console.error("Erreur lors de l’ouverture du booster :", error);
        updateUserBananas(user.bananas + boosterCost);
      }
    }
  };

  return (
    <button
      className={`${styles.openBoosterButton} ${
        !user || user.bananas < 10 ? styles.disabled : ""
      }`}
      onClick={handleOpening}
      disabled={!user || user.bananas < 10}
    >
      <p className={styles.buttonContent}>
        <span className={styles.text}>Ouvrir</span>
        <span className={styles.cost}>
          (10
          <Image
            src="/banana.png"
            alt="Banana"
            className={styles.bananaIcon}
            height={16}
            width={16}
          />
          )
        </span>
      </p>
    </button>
  );
}
