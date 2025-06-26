import { friendsMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function refuseRequest(id: number) {
  const res = await fetch(`${apiRoutes.FRIENDS}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(friendsMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
