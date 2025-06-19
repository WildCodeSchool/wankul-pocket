"use client";

import styles from "./OpenBoosterButton.module.css";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useOpenedCards } from "@/context/OpenedCardsContext";
import { getBoosterOpening } from "@/lib/openBooster/getBoosterOpening";
import { CardsModel } from "@/model/CardsModel";

interface OpenBoosterButtonProps {
  boosterId: number;
}

export default function OpenBoosterButton({
  boosterId,
}: OpenBoosterButtonProps) {
  const router = useRouter();
  const { user } = useUserContext();
  const { updateOpenedCards } = useOpenedCards();

  const handleOpening = async () => {
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    if (user.bananas >= 10) {
      try {
        const cards = await getBoosterOpening(boosterId, user.id, user.email);

        const formattedCards: CardsModel[] = cards.map((card: CardsModel) => ({
          id: card.id,
          name: card.name,
          drop_rate: card.drop_rate,
          image_path: card.image_path,
          rarity: card.rarity,
          quantity: card.quantity,
        }));

        updateOpenedCards(formattedCards);

        router.push(`/booster/${boosterId}/reveal`);
      } catch (error) {
        console.error("Erreur lors de l’ouverture du booster :", error);
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
      Ouvrir
    </button>
  );
}
