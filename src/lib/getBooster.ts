import { boostersMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { BoosterModel } from "@/model/BoosterModel";

export async function getOne(id: number): Promise<BoosterModel> {
  const res = await fetch(`${apiRoutes.BOOSTERS}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(boostersMessages.notFound || "Information non trouvée");
  }

  if (!res.ok) {
    throw new Error(boostersMessages.error);
  }

  return res.json();
}
