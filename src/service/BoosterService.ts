import { getOne } from "@/lib/getBooster";
import { getBoosters } from "@/lib/getBoosters";
import { BoosterModel } from "@/model/BoosterModel";

export async function getall() {
  return getBoosters();
}

export async function getOneById(id: number): Promise<BoosterModel> {
  return getOne(id);
}
