"use client";

import { useUserContext } from "@/context/UserContext";
import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import { getEveryFriends } from "@/service/FriendsService";
import { useEffect, useState } from "react";
import styles from "./NewTrade.module.css";
import ProposeTradeButton from "./ProposeTradeButton";
import TradeAdd from "./TradeAdd";

export interface NormalizedFriendModel {
  id: number;

  user1_id: number;
  user1_username: string;
  user1_email: string;
  user1_profil_id: string;
  user1_image_path: string;

  user2_id: number;
  user2_username: string;
  user2_email: string;
  user2_profil_id: string;
  user2_image_path: string;
}

export default function NewTrade() {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<NormalizedFriendModel[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFriend, setSelectedFriend] =
    useState<NormalizedFriendModel | null>(null);
  const [myCard, setMyCard] = useState<CardsModel | null>(null);
  const [friendCard, setFriendCard] = useState<CardsModel | null>(null);

  useEffect(() => {
    if (!userProfilId) return;

    getEveryFriends(userProfilId).then((fetchedFriends) => {
      const normalizedFriends = fetchedFriends.map((relation: FriendsModel) => {
        const isUser1 = relation.user_profil_id === userProfilId;

        return {
          id: relation.id,

          user1_id: isUser1 ? relation.user_id : relation.friend_id,
          user1_username: isUser1
            ? relation.user_username
            : relation.friend_username,
          user1_email: isUser1 ? relation.user_email : relation.friend_email,
          user1_profil_id: isUser1
            ? relation.user_profil_id
            : relation.friend_profil_id,
          user1_image_path: isUser1
            ? relation.user_image_path
            : relation.friend_image_path,

          user2_id: isUser1 ? relation.friend_id : relation.user_id,
          user2_username: isUser1
            ? relation.friend_username
            : relation.user_username,
          user2_email: isUser1 ? relation.friend_email : relation.user_email,
          user2_profil_id: isUser1
            ? relation.friend_profil_id
            : relation.user_profil_id,
          user2_image_path: isUser1
            ? relation.friend_image_path
            : relation.user_image_path,
        };
      });

      setFriends(normalizedFriends);
    });
  }, [userProfilId]);

  if (!userProfilId) {
    return <div>Chargement...</div>;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredFriends =
    search.length === 0
      ? []
      : friends.filter((friend) =>
          friend.user2_username?.toLowerCase().includes(search.toLowerCase())
        );

  const handleFriendSelection = (friend: NormalizedFriendModel) => {
    setSelectedFriend(friend);
    setSearch("");
    setMyCard(null);
    setFriendCard(null);
  };
  return (
    <>
      <section>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Selectionner un ami"
            onChange={handleSearchChange}
            value={search}
            maxLength={255}
            className={styles.input}
          />
          {search.length > 0 && (
            <ul className={styles.list}>
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <li
                    key={friend.id}
                    className={styles.friend}
                    onClick={() => handleFriendSelection(friend)}
                  >
                    {friend.user2_username}
                  </li>
                ))
              ) : (
                <li className={styles.none}>Aucun ami trouvé</li>
              )}
            </ul>
          )}
        </div>
      </section>
      <TradeAdd
        selectedFriend={selectedFriend}
        myCard={myCard}
        setMyCard={setMyCard}
        friendCard={friendCard}
        setFriendCard={setFriendCard}
      />
      <ProposeTradeButton
        selectedFriend={selectedFriend}
        myCard={myCard}
        friendCard={friendCard}
      />
    </>
  );
}
