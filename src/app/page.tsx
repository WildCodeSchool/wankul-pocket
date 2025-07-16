export const dynamic = "force-dynamic";

import { BoosterModel } from "@/model/BoosterModel";
import { CardsModel } from "@/model/CardsModel";
import { TradeModel } from "@/model/TradeModel";
import { getall } from "@/service/BoosterService";
import { getCollection } from "@/service/CollectionService";
import { getAll } from "@/service/TradeService";
import { HomepageBoosters } from "@/ui/HomepageBoosters";
import { HomepageCollection } from "@/ui/HomepageCollection";
import HomepageTrade from "@/ui/HomepageTrade";
import { getServerSession } from "next-auth";
import styles from "./page.module.css";

export default async function Homepage() {
  const boosters: BoosterModel[] = await getall();
  const session = await getServerSession();

  let collection: CardsModel[] = [];
  if (session?.user?.email) {
    try {
      collection = await getCollection(session.user.email);
    } catch (error) {
      console.error("Erreur lors de la récupération de la collection:", error);
      collection = [];
    }
  }

  let receivedTrade = null;
  let sentTrade = null;
  if (session?.user?.email) {
    try {
      receivedTrade = await getAll(session?.user?.email, "received");
      sentTrade = await getAll(session?.user?.email, "sent");
    } catch (error) {
      console.error("Erreur lors de la récupération des échanges:", error);
      receivedTrade = null;
      sentTrade = null;
    }
  }
  let displayedTrade: TradeModel | null = null;
  if (receivedTrade !== null && receivedTrade.length > 0) {
    displayedTrade = receivedTrade[0];
  } else if (sentTrade !== null && sentTrade.length > 0) {
    displayedTrade = sentTrade[0];
  } else {
    displayedTrade = null;
  }

  const components = [
    <HomepageTrade trade={displayedTrade} />,
    <HomepageCollection collection={collection} />,
    <HomepageBoosters boosters={boosters} />,
  ];

  return (
    <div className={styles.homepage}>
      {components.map((component, index) => (
        <div
          key={index}
          style={{ animationDelay: `${(components.length - index) * 0.1}s` }}
        >
          {component}
        </div>
      ))}
    </div>
  );
}
