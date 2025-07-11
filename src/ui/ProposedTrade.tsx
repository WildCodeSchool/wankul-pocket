"use client";

import { publicRoutes } from "@/data/ROUTES";
import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import { useReducer } from "react";
import styles from "./ProposedTrade.module.css";
import { TradeAcceptButton } from "./TradeAcceptButton";
import TradeContinueButton from "./TradeContinueButton";
import { TradeDeclineButton } from "./TradeDeclineButton";

interface ProposedTradeProps {
  trade: TradeModel;
}

type Action = { type: "ACCEPT" } | { type: "DECLINE" } | { type: "RESET" };

type TradeState = {
  isClicked: boolean;
  isAccepted: boolean;
  isDeclined: boolean;
  hideContent: boolean;
  showAcceptedContent: boolean;
  showDeclinedContent: boolean;
};

const initialState: TradeState = {
  isClicked: false,
  isAccepted: false,
  isDeclined: false,
  hideContent: false,
  showAcceptedContent: false,
  showDeclinedContent: false,
};

export default function ProposedTrade({ trade }: ProposedTradeProps) {
  function tradeReducer(state: TradeState, action: Action): TradeState {
    switch (action.type) {
      case "ACCEPT":
        return {
          isClicked: true,
          isAccepted: true,
          isDeclined: false,
          hideContent: true,
          showAcceptedContent: true,
          showDeclinedContent: false,
        };
      case "DECLINE":
        return {
          isClicked: true,
          isAccepted: false,
          isDeclined: true,
          hideContent: true,
          showAcceptedContent: false,
          showDeclinedContent: true,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(tradeReducer, initialState);

  return (
    <>
      {!state.isAccepted && !state.isDeclined && (
        <section
          className={`${styles.container} ${styles.fade} ${
            state.hideContent ? styles.fadeOut : ""
          }`}
        >
          <div className={styles.topSection}>
            <Image
              src={`${publicRoutes.PROFILS}/${trade.to_user_avatar}`}
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

      {state.isAccepted && (
        <section
          className={`${styles.container} ${
            state.showAcceptedContent ? styles.fadeIn : ""
          }`}
        >
          <div className={styles.topSection}>
            <Image
              src={`${publicRoutes.PROFILS}/${trade.to_user_avatar}`}
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

      {state.isDeclined && (
        <section
          className={`${styles.container} ${
            state.showDeclinedContent ? styles.fadeIn : ""
          }`}
        >
          <h3>Echange Refusé!</h3>
          <p>
            Peut-être une amitié de gâchée mais tu conserves ta carte, et
            c&apos;est bien ça le plus important!
          </p>
        </section>
      )}

      {!state.isClicked ? (
        <div
          className={`${styles.buttonSection} ${styles.fade} ${
            state.hideContent ? styles.fadeOut : ""
          }`}
        >
          <TradeAcceptButton trade={trade} dispatch={dispatch} />
          <TradeDeclineButton trade={trade} dispatch={dispatch} />
        </div>
      ) : (
        <div
          className={`${styles.buttonSection} ${
            state.showDeclinedContent || state.showAcceptedContent
              ? styles.fadeIn
              : ""
          }`}
        >
          <TradeContinueButton />
        </div>
      )}
    </>
  );
}
