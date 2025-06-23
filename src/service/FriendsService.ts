import { addFriend } from "@/lib/friends/addFriend";
import { FriendsModel } from "@/model/FriendsModel";

export async function addOne(friend: Omit<FriendsModel, "id">) {
  return addFriend(friend);
}
