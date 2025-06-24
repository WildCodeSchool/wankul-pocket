import { TradeModel } from "@/model/TradeModel";
import { getOneByEmail } from "@/service/TradeService";
import ProposedTrade from "@/ui/ProposedTrade";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
  const trade: TradeModel = await getOneByEmail(session?.user?.email);
  console.log(trade);
  return (
    <div>
      <h1>Échanges</h1>
      {trade === null || undefined ? (
        <p>Aucun échange en cours</p>
      ) : (
        <ProposedTrade trade={trade} />
      )}
    </div>
  );
}
