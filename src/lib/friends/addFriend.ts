import { apiRoutes } from "@/data/ROUTES";
import { FriendPayload } from "@/model/FriendPayload";

export async function addFriend(is_friend: FriendPayload) {
  const res = await fetch(apiRoutes.FRIENDS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(is_friend),
  });
  const result = await res.json();
  return result;
}
