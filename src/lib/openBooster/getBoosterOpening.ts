export async function getBoosterOpening(
  boosterId: number,
  userId: number,
  emailID: string
) {
  const res = await fetch(`/api/boosters/${boosterId}/cards?opening=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId.toString(),
      "x-user-email": emailID,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des cartes du booster");
  }

  const cards = await res.json();
  return cards;
}
