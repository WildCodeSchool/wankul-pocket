import { collectionMessages } from "@/data/responseMessages";
import { apiUrl } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";

export async function getOne(email: string): Promise<CardsModel[]> {
  const res = await fetch(`${apiUrl}/api/users/${email}/collections`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(collectionMessages.notFound || "Collection non trouvée");
  }

  if (!res.ok) {
    throw new Error(collectionMessages.error);
  }

  return res.json();
}
