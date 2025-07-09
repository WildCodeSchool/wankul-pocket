"use client";

import styles from "./OpenBoosterButton.module.css";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useOpenedCards, OpenedCard } from "@/context/OpenedCardsContext";
import { getBoosterOpening } from "@/lib/openBooster/getBoosterOpening";
import { CardsModel } from "@/model/CardsModel";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import { useCollectionContext } from "@/context/CollectionContext";

interface OpenBoosterButtonProps {
  boosterId: number;
}

export default function OpenBoosterButton({
  boosterId,
}: OpenBoosterButtonProps) {
  const router = useRouter();
  const { user, updateUserBananas } = useUserContext();
  const { updateOpenedCards } = useOpenedCards();
  const { setCollection, collection } = useCollectionContext();
  const { refreshProgress } = useQuestProgressContext();

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

        const cardsWithNewFlag = formattedCards.map((newCard) => {
          const existingCard = collection?.find(
            (card: CardsModel) => card.id === newCard.id
          );
          return {
            ...newCard,
            isNew: !existingCard || existingCard.quantity === 0,
          };
        }) as OpenedCard[];

        updateOpenedCards(cardsWithNewFlag);

        setCollection((prevCollection) => {
          const updatedCollection = [...prevCollection];

          formattedCards.forEach((newCard) => {
            const existingCardIndex = updatedCollection.findIndex(
              (card) => card.id === newCard.id
            );

            if (existingCardIndex !== -1) {
              updatedCollection[existingCardIndex].quantity += newCard.quantity;
            } else {
              updatedCollection.push(newCard);
            }
          });

          return updatedCollection;
        });

        refreshProgress();

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
          <img src="/banana.png" alt="Banana" className={styles.bananaIcon} />)
        </span>
      </p>
    </button>
  );
}
