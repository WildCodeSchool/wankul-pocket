import { db } from "@/lib/db";
import { getOne } from "@/lib/getBooster";
import { getBoosters } from "@/lib/getBoosters";
import { BoosterModel } from "@/model/BoosterModel";
import { CardsModel } from "@/model/CardsModel";
import { fetchBoosterCards } from "@/service/CardsService";
import { deductBananas } from "@/service/UserService";
import { selectCards } from "@/utils/cardSelectionUtils";

export async function getall() {
  return getBoosters();
}

export async function getOneById(id: number): Promise<BoosterModel> {
  return getOne(id);
}

export async function manageOpening(
  boosterId: number,
  userId: number
): Promise<CardsModel[]> {
  if (!userId) {
    throw new Error("Utilisateur non authentifié.");
  }

  const bananasCost = 10;

  try {
    const cards = await fetchBoosterCards(boosterId);

    const selectedCards = selectCards(cards);

    await deductBananas(userId, bananasCost);

    const cardIds = selectedCards.map((card) => card.id);
    await Promise.all(
      cardIds.map((cardId) =>
        db.query(
          `INSERT INTO collection (user_id, card_id, quantity)
           VALUES (?, ?, 1)
           ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
          [userId, cardId]
        )
      )
    );

    return selectedCards;
  } catch (error) {
    console.error("Erreur lors de l'ouverture du booster :", error);
    throw error;
  }
}
