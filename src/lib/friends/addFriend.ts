import { apiRoutes } from "@/data/ROUTES";
import { FriendsModel } from "@/model/FriendsModel";

export async function addFriend(is_friend: FriendsModel) {
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
