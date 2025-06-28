import { TradeModel } from "@/model/TradeModel";
import { getall } from "@/service/TradeService";
import NewTrade from "@/ui/NewTrade";
import ProposedTrade from "@/ui/ProposedTrade";
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
  const trades: TradeModel[] = await getall(session?.user?.email);
  console.log(trades);
  const displayedTrade = trades[0];
  return (
    <section className={styles.page}>
      {trades.length === 0 ? (
        <NewTrade />
      ) : (
        <ProposedTrade trade={displayedTrade} />
      )}
    </section>
  );
}
