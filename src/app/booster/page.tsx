import BoosterSelection from "@/ui/BoosterSelection";
import { getBoosters } from "@/lib/getBoosters";

const boosters = await getBoosters();

export default async function BoosterPage() {
  return <BoosterSelection boosters={boosters} />;
}
