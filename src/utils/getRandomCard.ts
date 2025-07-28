import { CardsModel } from "@/model/CardsModel";

export function getRandomCard(cards: CardsModel[]): CardsModel {
  const totalOfficialRate = cards.reduce(
    (sum, card) => sum + Number(card.official_rate || 0),
    0
  );
  if (totalOfficialRate === 0) {
    throw new Error(
      "Le total des official_rate est nul, impossible de sélectionner une carte."
    );
  }
  const randomValue = Math.random() * totalOfficialRate;
  let cumulativeRate = 0;
  for (const card of cards) {
    const officialRate = Number(card.official_rate || 0);
    cumulativeRate += officialRate;
    if (randomValue <= cumulativeRate) {
      return card;
    }
  }
  throw new Error(
    "La logique de sélection aléatoire a échoué. Vérifiez les données et les calculs."
  );
}
