import { tradesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteTrade(email: string, id: number) {
  const res = await fetch(`${apiRoutes.USERS}/${email}/trades/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(tradesMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
