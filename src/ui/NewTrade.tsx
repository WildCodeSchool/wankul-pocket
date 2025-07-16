"use client";

import { useUserContext } from "@/context/UserContext";
import { CardsModel } from "@/model/CardsModel";
import { NormalizedFriendModel } from "@/model/NormalizedFriendModel";
import { getEveryFriends } from "@/service/FriendsService";
import { normalizeFriends } from "@/utils/normalizeFriends";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import styles from "./NewTrade.module.css";
import ProposeTradeButton from "./ProposeTradeButton";
import TradeAdd from "./TradeAdd";
interface NewTradeProps {
  preselectedFriendId?: string;
}

export default function NewTrade({ preselectedFriendId }: NewTradeProps) {
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
      const normalizedFriends = normalizeFriends(fetchedFriends, userProfilId);
      setFriends(normalizedFriends);
    });
  }, [userProfilId]);

  useEffect(() => {
    if (preselectedFriendId && friends.length > 0) {
      const friend = friends.find((f) => f.id === preselectedFriendId);
      if (friend) {
        setSelectedFriend(friend);
      }
    }
  }, [preselectedFriendId, friends]);

  if (!userProfilId) {
    return <Loader />;
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
          <p>Sélectionne un ami pour proposer un échange</p>
          <input
            type="text"
            placeholder="Rechercher un ami"
            onChange={handleSearchChange}
            value={search}
            maxLength={25}
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
