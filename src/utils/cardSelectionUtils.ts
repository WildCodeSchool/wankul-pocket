import { CardsModel } from "../model/CardsModel";
import { getRandomCard } from "../utils/getRandomCard";

export function selectCards(cards: CardsModel[]): CardsModel[] {
  const selectedCards = Array.from({ length: 4 }, () => getRandomCard(cards));

  const filteredCards = cards.filter(
    (card) => card.official_rate && card.official_rate <= 30
  );
  if (filteredCards.length === 0) {
    throw new Error("Aucune carte avec un official_rate <= 30 trouvée.");
  }

  const fifthCard = getRandomCard(filteredCards);
  selectedCards.push(fifthCard);

  return selectedCards;
}
