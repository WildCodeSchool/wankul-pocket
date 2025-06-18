export async function addToCollection(emailId: string, cardIds: number[]) {
  const res = await fetch(`/api/users/${emailId}/collection/addCards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cardIds }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de l'ajout des cartes à la collection");
  }

  return await res.json();
}
