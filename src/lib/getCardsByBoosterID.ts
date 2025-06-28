import type { CardsModel } from "@/model/CardsModel";

export async function getCardsByBoosterId(
  boosterId: number
): Promise<CardsModel[]> {
  const res = await fetch(`/api/boosters/${boosterId}/cards`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des cartes");
  }

  return res.json();
}
