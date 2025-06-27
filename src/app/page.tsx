import { HomepageBoosters } from "@/ui/HomepageBoosters";
import { getall } from "@/service/BoosterService";
import { BoosterModel } from "@/model/BoosterModel";

export default async function Homepage() {
  const boosters: BoosterModel[] = await getall();

  return (
    <div>
      <HomepageBoosters boosters={boosters} />
    </div>
  );
}
