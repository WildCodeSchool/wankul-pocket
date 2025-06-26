import { HomepageBoosters } from "@/ui/HomepageBoosters";
import { getall } from "@/service/BoosterService";
import { BoosterModel } from "@/model/BoosterModel";

export default async function Homepage() {
  const boosters: BoosterModel[] = await getall();
  console.log("Boosters fetched:", boosters);

  return (
    <div>
      <h1>homepage</h1>
      <HomepageBoosters boosters={boosters} />
    </div>
  );
}
