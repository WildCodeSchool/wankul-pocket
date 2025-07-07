"use client";

import { getEveryFriends } from "@/service/FriendsService";
import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { useEffect, useState } from "react";
import { FriendDetail } from "./FriendDetail";
import styles from "./DisplayFriendList.module.css";
import Unfriend from "./Unfriend";
import TradeFromFriendList from "./TradeFromFriendList";
import Loader from "./Loader";

export default function DisplayFriendList() {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<FriendsModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userProfilId) return;

    setIsLoading(true);
    getEveryFriends(userProfilId)
      .then(setFriends)
      .catch((error) => {
        console.error("Error fetching friends:", error);
        setFriends([]);
      })
      .finally(() => setIsLoading(false));
  }, [userProfilId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2>Liste d'amis</h2>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Liste d'amis</h2>
      <ul className={styles.friendList}>
        {friends.map((friend) => {
          const isMe = friend.user_profil_id === userProfilId;
          const username = isMe
            ? friend.friend_username || "Unknown"
            : friend.user_username || "Unknown";
          const friendProfilId = isMe
            ? friend.friend_profil_id
            : friend.user_profil_id;
          return (
            <div key={friend.id} className={styles.friendDetail}>
              <FriendDetail friendProfilId={friendProfilId}>
                <li className={styles.friendItem}>
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
                  <div
                    className={styles.unfriendButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TradeFromFriendList friendId={friend.id.toString()} />
                    <Unfriend userId={friend.id} />
                  </div>
                </li>
              </FriendDetail>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
