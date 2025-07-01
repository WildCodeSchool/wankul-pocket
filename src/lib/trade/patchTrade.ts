import { apiRoutes } from "@/data/ROUTES";
import { tradesMessages } from "@/data/responseMessages";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";

export async function patchTrade(
  email: string,
  trade: UpdatedTradeModel
): Promise<{ message: string }> {
  const res = await fetch(`${apiRoutes.USERS}/${email}/trades`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(trade),
  });

  if (res.status === 404) {
    throw new Error(tradesMessages.notFound || "Echange non trouvé");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || tradesMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
