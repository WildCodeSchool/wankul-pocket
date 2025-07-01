import { HomepageBoosters } from "@/ui/HomepageBoosters";
import { HomepageCollection } from "@/ui/HomepageCollection";
import { getall } from "@/service/BoosterService";
import { getCollection } from "@/service/CollectionService";
import { BoosterModel } from "@/model/BoosterModel";
import { CardsModel } from "@/model/CardsModel";
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

  return (
    <div className={styles.homepage}>
      <HomepageCollection collection={collection} />
      <HomepageBoosters boosters={boosters} />
    </div>
  );
}
