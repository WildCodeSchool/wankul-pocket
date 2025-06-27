import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

interface newTradeModel {
  from_user_id: number | undefined;
  to_user_id: number | undefined;
  offered_card_id: number | undefined;
  requested_card_id: number | undefined;
  status: true;
  acceptance: null;
}

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

  if (!res.ok) throw new Error(tradesMessages.addFail);
  return res.json();
}
