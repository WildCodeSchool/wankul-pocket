export async function addToCollection(emailID: string, cardIds: number[]) {
  console.log("Requête envoyée :", { emailID, cardIds });
  const res = await fetch(`/api/users/${emailID}/collections/addCards`, {
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
