import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { BoosterModel } from "@/model/BoosterModel";

export async function getBoosters(): Promise<BoosterModel[]> {
  const res = await fetch(apiRoutes.BOOSTERS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(infoMessages.error);
  return res.json();
}
