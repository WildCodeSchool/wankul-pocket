import { friendsMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getAllFriends(userProfilId: string) {
  const res = await fetch(`${apiRoutes.FRIENDS}?userProfilId=${userProfilId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(friendsMessages.error);
  return res.json();
}
