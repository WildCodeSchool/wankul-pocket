import { FriendsModel } from "@/model/FriendsModel";

export const normalizeFriends = (
  fetchedFriends: FriendsModel[],
  userProfilId: string
) => {
  return fetchedFriends.map((relation) => {
    const isUser1 = relation.user_profil_id === userProfilId;

    return {
      id: relation.id?.toString() ?? "",
      user1_id: isUser1 ? relation.user_id ?? 0 : relation.friend_id ?? 0,
      user1_username: isUser1
        ? relation.user_username ?? ""
        : relation.friend_username ?? "",
      user1_email: isUser1
        ? relation.user_email ?? ""
        : relation.friend_email ?? "",
      user1_profil_id: isUser1
        ? relation.user_profil_id ?? ""
        : relation.friend_profil_id ?? "",
      user1_image_path: isUser1
        ? relation.user_image_path ?? ""
        : relation.friend_image_path ?? "",
      user2_id: isUser1 ? relation.friend_id ?? 0 : relation.user_id ?? 0,
      user2_username: isUser1
        ? relation.friend_username ?? ""
        : relation.user_username ?? "",
      user2_email: isUser1
        ? relation.friend_email ?? ""
        : relation.user_email ?? "",
      user2_profil_id: isUser1
        ? relation.friend_profil_id ?? ""
        : relation.user_profil_id ?? "",
      user2_image_path: isUser1
        ? relation.friend_image_path ?? ""
        : relation.user_image_path ?? "",
    };
  });
};
