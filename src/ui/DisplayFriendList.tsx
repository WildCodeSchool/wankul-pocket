"use client";

import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { getEveryFriends } from "@/service/FriendsService";
import Image from "next/image";
import { useEffect, useState, useTransition, useMemo } from "react";
import styles from "./DisplayFriendList.module.css";
import { FriendDetail } from "./FriendDetail";
import TradeFromFriendList from "./TradeFromFriendList";
import Loader from "./Loader";
import Unfriend from "./Unfriend";
import { publicRoutes } from "@/data/ROUTES";

export default function DisplayFriendList() {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<FriendsModel[]>([]);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!userProfilId) return;

    startTransition(async () => {
      try {
        const friends = await getEveryFriends(userProfilId);
        setFriends(friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriends([]);
      }
    });
  }, [userProfilId]);

  const filteredFriends = useMemo(() => {
    return friends.filter((friend) => {
      const isMe = friend.user_profil_id === userProfilId;
      const username = isMe
        ? friend.friend_username || "Unknown"
        : friend.user_username || "Unknown";
      return username.toLowerCase().includes(filter.toLowerCase());
    });
  }, [friends, filter, userProfilId]);

  const friendsDisplayData = useMemo(() => {
    return filteredFriends.map((friend) => {
      const isMe = friend.user_profil_id === userProfilId;
      return {
        id: friend.id,
        username: isMe
          ? friend.friend_username || "Unknown"
          : friend.user_username || "Unknown",
        friendProfilId: isMe ? friend.friend_profil_id : friend.user_profil_id,
        imagePath: isMe ? friend.friend_image_path : friend.user_image_path,
      };
    });
  }, [filteredFriends, userProfilId]);

  return (
    <div className={styles.container}>
      <h2>Liste d&apos;amis</h2>
      <input
        type="text"
        placeholder="Rechercher un ami..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterInput}
      />
      {isPending && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}
      {!isPending && (
        <ul className={styles.friendList}>
          {friendsDisplayData.map((friend) => (
            <div key={friend.id} className={styles.friendDetail}>
              <FriendDetail friendProfilId={friend.friendProfilId}>
                <li className={styles.friendItem}>
                  <Image
                    className={styles.friendImage}
                    src={`${publicRoutes.PROFILS}/${friend.imagePath}`}
                    alt={friend.username}
                    height={50}
                    width={50}
                  />
                  <p>{friend.username}</p>
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
          ))}
        </ul>
      )}
    </div>
  );
}
