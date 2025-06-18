"use client";

import styles from "./OpenBoosterButton.module.css";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useOpenedCards } from "@/context/OpenedCardsContext";
import { getBoosterOpening } from "@/lib/openBooster/getBoosterOpening";

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
        const cards = await getBoosterOpening(boosterId, user.id);

        interface Card {
          id: number;
          name: string;
          drop_rate: number;
          image_path: string;
        }

        const formattedCards: Card[] = cards.map((card: Card) => ({
          id: card.id,
          name: card.name,
          drop_rate: card.drop_rate,
          image_path: card.image_path,
        }));
        updateOpenedCards(formattedCards);

        router.push(`/booster/${boosterId}/reveal`);
      } catch (error) {
        console.error("Erreur lors de l’ouverture du booster :", error);
      }
    }
  };

  return (
    <button className={styles.openBoosterButton} onClick={handleOpening}>
      Ouvrir
    </button>
  );
}
