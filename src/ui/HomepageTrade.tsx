"use client";

import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomepageTrade.module.css";

interface Props {
  trade: TradeModel | null;
}

export default function HomepageTrade({ trade }: Props) {
  console.log(trade);
  if (trade === null || undefined) {
    return (
      <Link href={`/echange`} className={styles.container}>
        <div className={styles.trade}>
          <h2 className={styles.title}>Echanges</h2>
          <Image
            src={"./notification.png"}
            alt="Echange"
            width={50}
            height={50}
          />
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/echange`} className={styles.container}>
        <div className={styles.trade}>
          <h2 className={styles.title}>Echanges</h2>
          <Image
            src="/notification.png"
            alt="Notification d'échange"
            height={20}
            width={20}
            className={styles.notification}
          />
          <div className="cardsContainer">
            <Image
              src={trade?.requested_card_img}
              alt="Carte proposée"
              height={70}
              width={50}
              className={styles.card}
            />
            <Image src="/tradeIcon.png" alt="Echange" width={24} height={24} />
            <Image
              src={trade?.offered_card_img}
              alt="Carte proposée"
              height={70}
              width={50}
              className={styles.card}
            />
          </div>
        </div>
      </Link>
    );
  }
}
