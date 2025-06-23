import { addFriend } from "@/lib/friends/addFriend";
import { FriendsModel } from "@/model/FriendsModel";
import { getFriendsRequests } from "@/lib/friends/getFriendsRequests";
import { patchFriendRequest } from "@/lib/friends/acceptFriendRequest";
import { refuseRequest } from "@/lib/friends/refuseFriendRequest";
import { getAllFriends } from "@/lib/friends/getAllFriends";

export async function addOne(friend: FriendsModel) {
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
