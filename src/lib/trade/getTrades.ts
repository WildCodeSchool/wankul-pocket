import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { TradeModel } from "@/model/TradeModel";

type TradeType = "received" | "sent";

export async function getTrades(
  email: string,
  type: TradeType = "received"
): Promise<TradeModel[]> {
  const url = `${apiRoutes.USERS}/${email}/trades?type=${type}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(tradesMessages.error);
  return res.json();
}
