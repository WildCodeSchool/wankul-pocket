import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";

export async function getOne(id: number): Promise<CardsModel> {
  const res = await fetch(`${apiRoutes.CARDS}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(infoMessages.notFound || "Information non trouvée");
  }

  if (!res.ok) {
    throw new Error(infoMessages.error);
  }

  return res.json();
}
