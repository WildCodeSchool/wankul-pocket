import { TradeModel } from "@/model/TradeModel";
import { getAll } from "@/service/TradeService";
import NewTrade from "@/ui/NewTrade";
import ProposedTrade from "@/ui/ProposedTrade";
import SentTrade from "@/ui/SentTrade";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./TradePage.module.css";

interface TradeProps {
  searchParams: Promise<{
    friendId?: string;
  }>;
}

export default async function Trade({ searchParams }: TradeProps) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <>
        <p>Connecte toi pour consulter tes échanges</p>
        <Link href={"/landingpage"}>Se connecter</Link>
      </>
    );
  }

  const params = await searchParams;

  const receivedTrades: TradeModel[] = await getAll(
    session?.user?.email,
    "received"
  );
  const sentTrades: TradeModel[] = await getAll(session?.user?.email, "sent");
  const displayedReceivedTrade: TradeModel | null =
    receivedTrades.length > 0 ? receivedTrades[0] : null;
  const displayedSentTrade: TradeModel | null =
    sentTrades.length > 0 ? sentTrades[0] : null;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Echanges de cartes</h1>
      {displayedReceivedTrade && (
        <ProposedTrade trade={displayedReceivedTrade} />
      )}
      {displayedSentTrade && <SentTrade trade={displayedSentTrade} />}
      {!displayedReceivedTrade && !displayedSentTrade && (
        <NewTrade preselectedFriendId={params.friendId} />
      )}
    </section>
  );
}
