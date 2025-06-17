export async function getBoosterOpening(boosterId: number) {
  const res = await fetch(`/api/boosters/${boosterId}/cards?opening=true`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des cartes du booster");
  }

  const cards = await res.json();
  return cards;
}
