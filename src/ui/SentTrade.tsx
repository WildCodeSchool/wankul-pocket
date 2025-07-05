import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import styles from "./SentTrades.module.css";
import { TradeCancelButton } from "./TradeCancelButton";

interface SentTradeProps {
  trade: TradeModel;
}

export default function SentTrade({ trade }: SentTradeProps) {
  return (
    <section className={styles.container}>
      <div className={styles.topSection}>
        <Image
          src={trade.to_user_avatar}
          alt={trade.to_username}
          height={50}
          width={50}
        />
        <p>En attente de la réponse de {trade.to_username}</p>
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
            alt="Carte demandée"
            height={168}
            width={120}
          />
          <p>Carte demandée</p>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <TradeCancelButton trade={trade} />
      </div>
    </section>
  );
}
