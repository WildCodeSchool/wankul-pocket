import { CardsModel } from "@/model/CardsModel";
import { NormalizedFriendModel } from "@/model/NormalizedFriendModel";
import Image from "next/image";
import { Suspense, useState } from "react";
import CardPickerModal from "./CardPickerModal";
import Loader from "./Loader";
import styles from "./TradeAdd.module.css";

type TradeAddProps = {
  selectedFriend: NormalizedFriendModel | null;
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
  const userEmail = selectedFriend?.user1_email ?? "";
  const friendEmail = selectedFriend?.user2_email ?? "";

  return (
    <>
      <section className={styles.container}>
        {selectedFriend ? (
          <div>
            <p>
              Ami sélectionné :{" "}
              <strong>{selectedFriend?.user2_username}</strong>
            </p>
            <p>Sélectionne deux cartes de même rareté</p>
          </div>
        ) : (
          <p>Aucun ami sélectionné</p>
        )}
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
            <p>
              {selectedFriend
                ? `Carte de ${selectedFriend?.user2_username}`
                : `Carte demandée`}
            </p>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      )}
    </>
  );
}
