import { fetchBoosterCards } from "@/service/CardsService";
import { selectCards } from "@/utils/cardSelectionUtils";
import { deductBananas } from "@/service/BananasService";
import { addCardsToCollection } from "@/service/CollectionService";
import { CardsModel } from "@/model/CardsModel";

export async function manageOpening(
  boosterId: number,
  userId: number,
  emailId: string
): Promise<CardsModel[]> {
  if (!userId) {
    throw new Error("Utilisateur non authentifié.");
  }

  const bananasCost = 10;

  try {
    const cards = await fetchBoosterCards(boosterId);

    const selectedCards = selectCards(cards);

    await deductBananas(userId, bananasCost);

    await addCardsToCollection(emailId, selectedCards);

    return selectedCards;
  } catch (error) {
    console.error("Erreur lors de l'ouverture du booster :", error);
    throw error;
  }
}
