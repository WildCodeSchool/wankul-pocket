import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import Image from "next/image";
import { useState } from "react";
import CardPickerModal from "./CardPickerModal";
import styles from "./TradeAdd.module.css";

type TradeAddProps = {
  selectedFriend: FriendsModel | null;
};

export default function TradeAdd({ selectedFriend }: TradeAddProps) {
  const [isModalOpen, setIsModalOpen] = useState<"mine" | "friend" | null>(
    null
  );
  const [myCard, setMyCard] = useState<CardsModel | null>(null);
  const [friendCard, setFriendCard] = useState<CardsModel | null>(null);
  const userEmail = selectedFriend?.user_email ?? "";
  const friendEmail = selectedFriend?.friend_email ?? "";

  console.log(myCard);
  console.log(friendCard);

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
              <Image
                src={"/add.png"}
                alt="Choisir une carte"
                height={30}
                width={30}
              />
            </button>
            <p>Votre carte</p>
          </div>
          <Image src={"/tradeIcon.png"} alt="Echange" height={30} width={30} />
          <div className={styles.cardContainer}>
            <button
              className={styles.button}
              onClick={() => setIsModalOpen("friend")}
              disabled={!selectedFriend}
            >
              <Image
                src={"/add.png"}
                alt="Choisir une carte"
                height={30}
                width={30}
              />
            </button>
            <p>Carte demandée</p>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <CardPickerModal
          onClose={() => setIsModalOpen(null)}
          email={isModalOpen === "mine" ? userEmail : friendEmail}
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
