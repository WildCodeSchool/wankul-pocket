import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";
import { boostersMessages } from "@/data/responseMessages";

export async function manageOpening(boosterId: number): Promise<CardsModel[]> {
  try {
    const [rows] = await db.query(`SELECT * FROM card WHERE booster_id = ?`, [
      boosterId,
    ]);

    const cards: CardsModel[] = rows as CardsModel[];

    if (cards.length === 0) {
      throw new Error(boostersMessages.notFound);
    }

    function getRandomCard(cards: CardsModel[]): CardsModel {
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

    const selectedCards: CardsModel[] = [];
    for (let i = 0; i < 4; i++) {
      const card = getRandomCard(cards);
      selectedCards.push(card);
    }

    const filteredCards = cards.filter(
      (card) => card.official_rate && card.official_rate <= 30
    );

    if (filteredCards.length === 0) {
      throw new Error("Aucune carte avec un official_rate <= 30 trouvée.");
    }

    const fifthCard = getRandomCard(filteredCards);
    selectedCards.push(fifthCard);

    return selectedCards;
  } catch (error) {
    console.error("Erreur lors de l'ouverture du booster :", error);
    throw error;
  }
}
