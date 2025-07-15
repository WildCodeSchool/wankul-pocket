import { CardsModel } from "../model/CardsModel";
import { getRandomCard } from "../utils/getRandomCard";

export function selectCards(cards: CardsModel[]): CardsModel[] {
  const randomChance = Math.random() * 100;

  const goldenPack = 0.5;

  if (randomChance <= goldenPack) {
    const ultraRareCards = cards.filter(
      (card) => card.official_rate && card.official_rate < 3
    );
    if (ultraRareCards.length === 0) {
      throw new Error(
        "Aucune carte avec un official_rate < 3% trouvée pour le pack spécial."
      );
    }

    return Array.from({ length: 5 }, () => getRandomCard(ultraRareCards));
  }

  const commonCards = cards.filter(
    (card) => card.official_rate && card.official_rate >= 1
  );
  if (commonCards.length === 0) {
    throw new Error("Aucune carte avec un official_rate >= 1% trouvée.");
  }

  const selectedCards = Array.from({ length: 3 }, () =>
    getRandomCard(commonCards)
  );

  selectedCards.push(getRandomCard(cards));

  const rareCards = cards.filter(
    (card) => card.official_rate && card.official_rate <= 30
  );
  if (rareCards.length === 0) {
    throw new Error("Aucune carte avec un official_rate <= 30% trouvée.");
  }

  const fifthCard = getRandomCard(rareCards);
  selectedCards.push(fifthCard);

  return selectedCards;
}
