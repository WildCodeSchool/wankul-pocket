"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { OpenedCard, useOpenedCards } from "@/context/OpenedCardsContext";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import { useUserContext } from "@/context/UserContext";
import { getBoosterOpening } from "@/lib/openBooster/getBoosterOpening";
import { CardsModel } from "@/model/CardsModel";
import { useState } from "react";
import Loader from "@/ui/Loader";
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
  const { setCollection } = useCollectionContext();
  const { refreshProgress } = useQuestProgressContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpening = async () => {
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const boosterCost = 10;

    if (user.bananas >= boosterCost) {
      try {
        setIsLoading(true);

        updateUserBananas(user.bananas - boosterCost);

        const cards = await getBoosterOpening(boosterId, user.id, user.email);

        const formattedCards: CardsModel[] = cards;

        let cardsWithNewFlag: OpenedCard[];

        setCollection((prevCollection) => {
          const updatedCollection = [...prevCollection];

          cardsWithNewFlag = formattedCards.map((newCard) => {
            const existingCard = prevCollection?.find(
              (card: CardsModel) => card.id === newCard.id
            );

            const existingCardIndex = updatedCollection.findIndex(
              (card) => card.id === newCard.id
            );

            if (existingCardIndex !== -1) {
              updatedCollection[existingCardIndex].quantity += newCard.quantity;
            } else {
              updatedCollection.push(newCard);
            }

            return {
              ...newCard,
              isNew: !existingCard || existingCard.quantity === 0,
            };
          }) as OpenedCard[];

          return updatedCollection;
        });

        updateOpenedCards(cardsWithNewFlag!);

        refreshProgress();
        await router.push(`/booster/${boosterId}/reveal`);
      } catch (error) {
        console.error("Erreur lors de l’ouverture du booster :", error);
        updateUserBananas(user.bananas + boosterCost);
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      className={`${styles.openBoosterButton} ${
        !user || user.bananas < 10 ? styles.disabled : ""
      }`}
      onClick={handleOpening}
      disabled={!user || user.bananas < 10 || isLoading}
    >
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
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
      )}
    </button>
  );
}
