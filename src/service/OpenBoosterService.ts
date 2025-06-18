import { getCardsByBoosterId } from "@/service/CardsService";
import { updateUserBananas } from "@/service/UserService";
import { addCardToCollection } from "@/service/CollectionService";
import { CardsModel } from "@/model/CardsModel";
import { boostersMessages } from "@/data/responseMessages";
import { getRandomCard } from "@/utils/getRandomCard";

export async function manageOpening(
  boosterId: number,
  userId: number
): Promise<CardsModel[]> {
  if (!userId) {
    throw new Error("Utilisateur non authentifié.");
  }

  const bananasCost = 10;

  try {
    const cards = await getCardsByBoosterId(boosterId);

    if (cards.length === 0) {
      throw new Error(boostersMessages.notFound);
    }

    const selectedCards = Array.from({ length: 4 }, () => getRandomCard(cards));

    const filteredCards = cards.filter(
      (card) => card.official_rate && card.official_rate <= 30
    );
    if (filteredCards.length === 0) {
      throw new Error("Aucune carte avec un official_rate <= 30 trouvée.");
    }

    const fifthCard = getRandomCard(filteredCards);
    selectedCards.push(fifthCard);

    await updateUserBananas(userId, bananasCost);

    return selectedCards;
  } catch (error) {
    console.error("Erreur lors de l'ouverture du booster :", error);
    throw error;
  }
}
