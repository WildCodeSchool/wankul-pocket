import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { newTradeModel } from "@/model/NewTradeModel";

export async function addTrade(
  email: string | undefined,
  trade: newTradeModel
) {
  const res = await fetch(`${apiRoutes.USERS}/${email}/trades`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || tradesMessages.addFail);
  }

  return data;
}
