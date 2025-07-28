import { apiRoutes } from "@/data/ROUTES";

export async function addToCollection(
  emailID: string,
  cardIds: (number | undefined)[]
) {
  const res = await fetch(apiRoutes.COLLECTIONS(emailID), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥
    body: JSON.stringify({ cardIds }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de l'ajout des cartes à la collection");
  }

  return await res.json();
}
