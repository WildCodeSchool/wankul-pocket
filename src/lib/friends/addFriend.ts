import { friendsMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addFriend(info: {
  user_profil_id: string;
  friend_profil_id: string;
  status: boolean;
  acceptance: boolean;
}) {
  const res = await fetch(apiRoutes.FRIENDS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (!res.ok) throw new Error(friendsMessages.addFail);
  return res.json();
}
