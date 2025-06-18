import { CardsModel } from "@/model/CardsModel";

export function getRandomCard(cards: CardsModel[]): CardsModel {
  const totalDropRate = cards.reduce(
    (sum, card) => sum + Number(card.drop_rate || 0),
    0
  );
  if (totalDropRate === 0) {
    throw new Error(
      "Le total des drop_rate est nul, impossible de sélectionner une carte."
    );
  }
  const randomValue = Math.random() * totalDropRate;
  let cumulativeRate = 0;
  for (const card of cards) {
    const dropRate = Number(card.drop_rate || 0);
    cumulativeRate += dropRate;
    if (randomValue <= cumulativeRate) {
      return card;
    }
  }
  throw new Error(
    "La logique de sélection aléatoire a échoué. Vérifiez les données et les calculs."
  );
}
