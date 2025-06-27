import { HomepageBoosters } from "@/ui/HomepageBoosters";
import { HomepageCollection } from "@/ui/HomepageCollection";
import { getall } from "@/service/BoosterService";
import { getCollection } from "@/service/CollectionService";
import { BoosterModel } from "@/model/BoosterModel";
import { getServerSession } from "next-auth";
import styles from "./page.module.css";

export default async function Homepage() {
  const boosters: BoosterModel[] = await getall();
  const session = await getServerSession();
  const collection = session?.user?.email
    ? await getCollection(session.user.email)
    : [];

  return (
    <div className={styles.homepage}>
      <HomepageCollection collection={collection} />
      <HomepageBoosters boosters={boosters} />
    </div>
  );
}
