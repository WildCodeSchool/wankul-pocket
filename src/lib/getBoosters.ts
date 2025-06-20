import { boostersMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { BoosterModel } from "@/model/BoosterModel";

export async function getBoosters(): Promise<BoosterModel[]> {
  const res = await fetch(apiRoutes.BOOSTERS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(boostersMessages.error);
  return res.json();
}
