"use client";

import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { getEveryFriends } from "@/service/FriendsService";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./DisplayFriendList.module.css";
import { FriendDetail } from "./FriendDetail";
import TradeFromFriendList from "./TradeFromFriendList";
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
      <h2>Liste d&apos;amis</h2>
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
                  <Image
                    className={styles.friendImage}
                    src={
                      isMe
                        ? `${friend.friend_image_path}`
                        : `${friend.user_image_path}`
                    }
                    alt={username}
                    height={50}
                    width={50}
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
