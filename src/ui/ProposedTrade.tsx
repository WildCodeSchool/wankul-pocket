"use client";

import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import { useState } from "react";
import styles from "./ProposedTrade.module.css";
import { TradeAcceptButton } from "./TradeAcceptButton";
import TradeContinueButton from "./TradeContinueButton";
import { TradeDeclineButton } from "./TradeDeclineButton";

interface ProposedTradeProps {
  trade: TradeModel;
}

export default function ProposedTrade({ trade }: ProposedTradeProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);
  return (
    <>
      {!isAccepted && !isDeclined && (
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
              <p>Ta carte</p>
            </div>
            <Image
              src={"/tradeIcon.png"}
              alt="Echange"
              height={30}
              width={30}
            />
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
      )}

      {isAccepted && (
        <section className={styles.container}>
          <div className={styles.topSection}>
            <Image
              src={trade.from_user_avatar}
              alt={trade.from_username}
              height={50}
              width={50}
            />
            <h3>Echange effectué avec {trade.from_username} !</h3>
          </div>
          <div className={styles.cardsSection}>
            <div className={styles.cardContainer}>
              <Image
                src={trade.offered_card_img}
                alt="Carte obtenue"
                height={168}
                width={120}
              />
              <p>Carte obtenue</p>
            </div>
            <Image
              src={"/tradeIcon.png"}
              alt="Echange"
              height={30}
              width={30}
            />
            <div className={styles.cardContainer}>
              <Image
                src={trade.requested_card_img}
                alt="Carte donnée"
                height={168}
                width={120}
              />
              <p>Carte donnée</p>
            </div>
          </div>
        </section>
      )}

      {isDeclined && (
        <section className={styles.container}>
          <h3>Echange Refusé!</h3>
          <p>
            Peut-être une amitié de gâchée mais tu conserves ta carte, et
            c&apos;est bien ça le plus important!
          </p>
        </section>
      )}

      {!isClicked ? (
        <div className={styles.buttonSection}>
          <TradeAcceptButton
            trade={trade}
            setIsClicked={setIsClicked}
            setIsAccepted={setIsAccepted}
          />
          <TradeDeclineButton
            trade={trade}
            setIsClicked={setIsClicked}
            setIsDeclined={setIsDeclined}
          />
        </div>
      ) : (
        <div className={styles.buttonSection}>
          <TradeContinueButton />
        </div>
      )}
    </>
  );
}
