import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomepageTrade.module.css";

interface Props {
  trade: TradeModel | null;
}

export default function HomepageTrade({ trade }: Props) {
  return (
    <Link
      href={`/echange`}
      className={trade ? styles.container : styles.containerNoTrade}
    >
      <h2 className={trade ? styles.title : styles.titleNoTrade}>Echanges</h2>
      <div className={styles.trade}>
        {trade && (
          <Image
            src="/notification.png"
            alt="Notification d'échange"
            height={24}
            width={24}
            className={styles.notification}
          />
        )}
        <div className={styles.cardsContainer}>
          <Image
            src={!trade ? "/cardVerso.png" : trade?.offered_card_img}
            alt="Carte proposée"
            height={100}
            width={71}
            className={styles.card}
          />
          <Image
            src="/tradeIcon.png"
            alt="Echange"
            width={36}
            height={36}
            className={styles.tradeIcon}
          />
          <Image
            src={!trade ? "/cardVerso.png" : trade?.requested_card_img}
            alt="Carte proposée"
            height={100}
            width={71}
            className={styles.card}
          />
        </div>
      </div>
    </Link>
  );
}
