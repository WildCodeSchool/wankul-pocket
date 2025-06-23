import { apiRoutes } from "@/data/ROUTES";
import { friendsMessages } from "@/data/responseMessages";
import { FriendsModel } from "@/model/FriendsModel";

export async function patchFriendRequest(
  is_friend: FriendsModel
): Promise<{ message: string }> {
  const res = await fetch(`${apiRoutes.FRIENDS}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: Number(is_friend.id),
      status: Boolean(is_friend.status),
      acceptance: Boolean(is_friend.acceptance),
    }),
  });

  if (res.status === 404) {
    throw new Error(friendsMessages.notFound || "Demande d'ami non trouvée");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || friendsMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
