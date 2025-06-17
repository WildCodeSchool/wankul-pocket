import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { CardsModel } from "@/model/CardsModel";

export async function getCards(): Promise<CardsModel[]> {
  const res = await fetch(apiRoutes.CARDS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(infoMessages.error);
  return res.json();
}
