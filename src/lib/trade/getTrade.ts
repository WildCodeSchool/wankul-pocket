import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { TradeModel } from "@/model/TradeModel";

export async function getOne(email: string): Promise<TradeModel> {
  const res = await fetch(`${apiRoutes.USERS}/${email}/trades`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(tradesMessages.notFound || "Echange non trouvé");
  }

  if (!res.ok) {
    throw new Error(tradesMessages.error);
  }

  return res.json();
}
