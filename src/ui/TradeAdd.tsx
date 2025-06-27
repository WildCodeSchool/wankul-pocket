import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import Image from "next/image";
import { useState } from "react";
import CardPickerModal from "./CardPickerModal";
import styles from "./TradeAdd.module.css";

type TradeAddProps = {
  selectedFriend: FriendsModel | null;
  myCard: CardsModel | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
  friendCard: CardsModel | null;
  setFriendCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
};

export default function TradeAdd({
  selectedFriend,
  myCard,
  setMyCard,
  friendCard,
  setFriendCard,
}: TradeAddProps) {
  const [isModalOpen, setIsModalOpen] = useState<"mine" | "friend" | null>(
    null
  );
  const userEmail = selectedFriend?.user_email ?? "";
  const friendEmail = selectedFriend?.friend_email ?? "";

  return (
    <>
      <section className={styles.container}>
        <p>
          {selectedFriend
            ? `Ami sélectionné : ${selectedFriend?.friend_username}`
            : `Selectionne un ami pour lui proposer un échange`}
        </p>
        <div className={styles.cardsSection}>
          <div className={styles.cardContainer}>
            <button
              className={styles.button}
              onClick={() => {
                setIsModalOpen("mine");
              }}
              disabled={!selectedFriend}
            >
              {myCard ? (
                <Image
                  src={myCard.image_path}
                  alt="Ta carte"
                  height={168}
                  width={120}
                  className={styles.selectedCard}
                />
              ) : (
                <Image
                  src={"/add.png"}
                  alt="Choisir une carte"
                  height={30}
                  width={30}
                />
              )}
            </button>
            <p>Ta carte</p>
          </div>
          <Image src={"/tradeIcon.png"} alt="Echange" height={30} width={30} />
          <div className={styles.cardContainer}>
            <button
              className={styles.button}
              onClick={() => setIsModalOpen("friend")}
              disabled={!selectedFriend}
            >
              {friendCard ? (
                <Image
                  src={friendCard?.image_path}
                  alt="Carte de ton ami"
                  height={168}
                  width={120}
                  className={styles.selectedCard}
                />
              ) : (
                <Image
                  src={"/add.png"}
                  alt="Choisir une carte"
                  height={30}
                  width={30}
                />
              )}
            </button>
            <p>Carte demandée</p>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <CardPickerModal
          onClose={() => setIsModalOpen(null)}
          email={isModalOpen === "mine" ? userEmail : friendEmail}
          rarity={
            isModalOpen === "friend" ? myCard?.rarity : friendCard?.rarity
          }
          onSelect={(card) => {
            if (isModalOpen === "mine") setMyCard(card);
            else setFriendCard(card);
            setIsModalOpen(null);
          }}
        />
      )}
    </>
  );
}
