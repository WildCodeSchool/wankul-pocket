import { friendsMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getFriendDetails(friendProfilId: string) {
  const res = await fetch(apiRoutes.FRIENDS_DETAILS(friendProfilId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(friendsMessages.error);
  }

  const data = await res.json();
  return data;
}
