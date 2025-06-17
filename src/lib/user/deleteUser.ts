import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteUser(id: number) {
  const res = await fetch(`${apiRoutes.USERS}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(userMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
