import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import styles from "./ProposedTrade.module.css";
import { TradeAcceptButton } from "./TradeAcceptButton";
import { TradeDeclineButton } from "./TradeDeclineButton";

interface ProposedTradeProps {
  trade: TradeModel;
}

export default function ProposedTrade({ trade }: ProposedTradeProps) {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.topSection}>
          <Image
            src={trade.from_user_avatar}
            alt={trade.from_username}
            height={50}
            width={50}
          />
          <p>{trade.from_username} veut procéder à un échange</p>
        </div>
        <div className={styles.cardsSection}>
          <div className={styles.cardContainer}>
            <Image
              src={trade.requested_card_img}
              alt="Carte demandée"
              height={168}
              width={120}
            />
            <p>Votre carte</p>
          </div>
          <Image src={"/tradeIcon.png"} alt="Echange" height={30} width={30} />
          <div className={styles.cardContainer}>
            <Image
              src={trade.offered_card_img}
              alt="Carte proposée"
              height={168}
              width={120}
            />
            <p>Carte proposée</p>
          </div>
        </div>
      </section>
      <div className={styles.buttonSection}>
        <TradeAcceptButton />
        <TradeDeclineButton />
      </div>
    </>
  );
}
