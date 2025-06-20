import { getOne } from "@/lib/getBooster";
import { getBoosters } from "@/lib/getBoosters";
import { BoosterModel } from "@/model/BoosterModel";
import { fetchBoosterCards } from "@/service/CardsService";
import { selectCards } from "@/utils/cardSelectionUtils";
import { deductBananas } from "@/service/BananasService";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { CardsModel } from "@/model/CardsModel";

export async function getall() {
  return getBoosters();
}

export async function getOneById(id: number): Promise<BoosterModel> {
  return getOne(id);
}

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

    const cardIds = selectedCards.map((card) => card.id);
    await addToCollection(emailId, cardIds);

    return selectedCards;
  } catch (error) {
    console.error("Erreur lors de l'ouverture du booster :", error);
    throw error;
  }
}
