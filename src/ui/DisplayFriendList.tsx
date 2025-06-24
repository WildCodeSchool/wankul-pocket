"use client";

import { getEveryFriends } from "@/service/FriendsService";
import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { useEffect, useState } from "react";
import styles from "./DisplayFriendList.module.css";
import Unfriend from "./Unfriend";

export default function DisplayFriendList() {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<FriendsModel[]>([]);

  useEffect(() => {
    if (!userProfilId) return;
    getEveryFriends(userProfilId).then(setFriends);
  }, [userProfilId]);

  if (!userProfilId) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Liste d'amis</h2>
      <ul className={styles.friendList}>
        {friends.map((friend) => {
          const isMe = friend.user_profil_id === userProfilId;
          const username = isMe ? friend.friend_username : friend.user_username;
          return (
            <li key={friend.id} className={styles.friendItem}>
              <img
                className={styles.friendImage}
                src={
                  isMe
                    ? `${friend.friend_image_path}`
                    : `${friend.user_image_path}`
                }
                alt={username}
              />
              <p>{username}</p>
              <div className={styles.unfriendButton}>
                <Unfriend userId={friend.id} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
