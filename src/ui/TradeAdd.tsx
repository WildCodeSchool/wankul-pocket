import { FriendsModel } from "@/model/FriendsModel";
import Image from "next/image";
import styles from "./TradeAdd.module.css";

type TradeAddProps = {
  selectedFriend: FriendsModel | null;
};

export default function TradeAdd({ selectedFriend }: TradeAddProps) {
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
            <button className={styles.button} onClick={() => {}}>
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
            <button className={styles.button}>
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
    </>
  );
}
