export async function getBoosterOpening(boosterId: number, userId: number) {
  const res = await fetch(`/api/boosters/${boosterId}/open`, {
    //const res = await fetch(`/api/boosters/${boosterId}/cards?opening=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des cartes du booster");
  }

  const cards = await res.json();
  return cards;
}
