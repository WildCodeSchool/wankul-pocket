import { patchFriendRequest } from "@/lib/friends/acceptFriendRequest";
import { addFriend } from "@/lib/friends/addFriend";
import { getAllFriends } from "@/lib/friends/getAllFriends";
import { getFriendsRequests } from "@/lib/friends/getFriendsRequests";
import { refuseRequest } from "@/lib/friends/refuseFriendRequest";
import { FriendPayload, FriendsModel } from "@/model/FriendsModel";

export async function addOne(friend: FriendPayload) {
  return addFriend(friend);
}

export async function getAllRequests(userProfilId: string) {
  return getFriendsRequests(userProfilId);
}

export async function acceptRequest(friend: FriendsModel) {
  return patchFriendRequest(friend);
}

export async function refuseFriendRequest(id: number) {
  return refuseRequest(id);
}

export async function getEveryFriends(userProfilId: string) {
  return getAllFriends(userProfilId);
}
