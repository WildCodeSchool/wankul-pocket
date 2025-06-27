"use client";

import { useUserContext } from "@/context/UserContext";
import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import { getEveryFriends } from "@/service/FriendsService";
import { useEffect, useState } from "react";
import styles from "./NewTrade.module.css";
import ProposeTradeButton from "./ProposeTradeButton";
import TradeAdd from "./TradeAdd";

export default function NewTrade() {
  const { user } = useUserContext();
  const userProfilId = user?.profil_id;
  const [friends, setFriends] = useState<FriendsModel[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<FriendsModel | null>(
    null
  );
  const [myCard, setMyCard] = useState<CardsModel | null>(null);
  const [friendCard, setFriendCard] = useState<CardsModel | null>(null);

  useEffect(() => {
    if (!userProfilId) return;
    getEveryFriends(userProfilId).then(setFriends);
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
          friend.friend_username?.toLowerCase().includes(search.toLowerCase())
        );

  const handleFriendSelection = (friend: FriendsModel) => {
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
                    {friend.friend_username}
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
        setMyCard={setMyCard}
        friendCard={friendCard}
        setFriendCard={setFriendCard}
      />
    </>
  );
}
