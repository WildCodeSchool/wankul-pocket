import { collectionMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";

export async function getOne(user_id: number): Promise<CardsModel[]> {
  const res = await fetch(`${apiRoutes.COLLECTIONS}/${user_id}`, {
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
