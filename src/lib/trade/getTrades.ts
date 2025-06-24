import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { TradeModel } from "@/model/TradeModel";

export async function getTrades(email: string): Promise<TradeModel[]> {
  const res = await fetch(`${apiRoutes.USERS}/${email}/trades`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(tradesMessages.error);
  return res.json();
}
