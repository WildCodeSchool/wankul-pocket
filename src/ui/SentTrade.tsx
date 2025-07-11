"use client";

import { publicRoutes } from "@/data/ROUTES";
import { TradeModel } from "@/model/TradeModel";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";
import { editOne } from "@/service/TradeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./SentTrades.module.css";
import { TradeCancelButton } from "./TradeCancelButton";

interface SentTradeProps {
  trade: TradeModel;
}

export default function SentTrade({ trade }: SentTradeProps) {
  const router = useRouter();
  const handleAccepted = async () => {
    const acceptedTrade: UpdatedTradeModel = {
      id: trade.id,
      status: false,
      acceptance: true,
    };
    const to_user_email = trade.to_user_email;
    await editOne(to_user_email, acceptedTrade);
    router.refresh();
  };
  const handleDeclined = () => {
    const declinedTrade: UpdatedTradeModel = {
      id: trade.id,
      status: false,
      acceptance: false,
    };
    const to_user_email = trade.to_user_email;
    editOne(to_user_email, declinedTrade);
    router.refresh();
  };
  if (trade.acceptance === null) {
    return (
      <section className={styles.container}>
        <div className={styles.topSection}>
          <Image
            src={`${publicRoutes.PROFILS}/${trade.to_user_avatar}`}
            alt={trade.to_username}
            height={50}
            width={50}
          />
          <p>En attente de la réponse de {trade.to_username}</p>
        </div>
        <div className={styles.cardsSection}>
          <div className={styles.cardContainer}>
            <Image
              src={trade.offered_card_img}
              alt="Ta carte"
              height={168}
              width={120}
            />
            <p>Ta carte</p>
          </div>
          <Image src={"/tradeIcon.png"} alt="Echange" height={30} width={30} />
          <div className={styles.cardContainer}>
            <Image
              src={trade.requested_card_img}
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
  } else if (trade.acceptance) {
    return (
      <section className={styles.container}>
        <h3>Echange accepté!</h3>
        <p>{trade.to_username} a accepté ta demande d&apos;échange!</p>

        <div className={styles.cardsSection}>
          <div className={styles.cardContainer}>
            <Image
              src={trade.requested_card_img}
              alt="Carte obtenue"
              height={168}
              width={120}
            />
            <p>Carte obtenue</p>
          </div>
          <Image src={"/tradeIcon.png"} alt="Echange" height={30} width={30} />
          <div className={styles.cardContainer}>
            <Image
              src={trade.offered_card_img}
              alt="Carte donnée"
              height={168}
              width={120}
            />
            <p>Carte donnée</p>
          </div>
        </div>
        <div className={styles.buttonSection}>
          <button onClick={handleAccepted}>Continuer</button>
        </div>
      </section>
    );
  } else if (!trade.acceptance) {
    return (
      <section className={styles.container}>
        <h3>Echange refusé...</h3>
        <p>{trade.to_username} a refusé ta demande d&apos;échange</p>
        <button onClick={handleDeclined}>Continuer</button>
      </section>
    );
  }
}
