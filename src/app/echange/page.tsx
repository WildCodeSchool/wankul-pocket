import { TradeModel } from "@/model/TradeModel";
import { getall } from "@/service/TradeService";
import NewTrade from "@/ui/NewTrade";
import ProposedTrade from "@/ui/ProposedTrade";
import SentTrade from "@/ui/SentTrade";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./TradePage.module.css";

export default async function Echange() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <>
        <p>Connecte toi pour consulter tes échanges</p>
        <Link href={"/landingpage"}>Se connecter</Link>
      </>
    );
  }
  const receivedTrades: TradeModel[] = await getall(
    session?.user?.email,
    "received"
  );
  const sentTrades: TradeModel[] = await getall(session?.user?.email, "sent");
  const displayedReceivedTrade = receivedTrades[0];
  const displayedSentTrade = sentTrades[0];

  return (
    <section className={styles.page}>
      {receivedTrades.length >= 1 && (
        <ProposedTrade trade={displayedReceivedTrade} />
      )}
      {sentTrades.length >= 1 && <SentTrade trade={displayedSentTrade} />}
      {receivedTrades.length === 0 && sentTrades.length === 0 && <NewTrade />}
    </section>
  );
}
