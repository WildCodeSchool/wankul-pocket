import { collectionMessages } from "@/data/responseMessages";
import { apiUrl } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";
import { GetOneOption } from "@/model/GetOneOptionModel";

export async function getOne(
  email: string,
  option: GetOneOption = {}
): Promise<CardsModel[]> {
  const { rarity } = option;

  let url = `${apiUrl}/api/users/${email}/collections`;
  if (rarity) {
    url += `?rarity=${encodeURIComponent(rarity)}`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    console.error(collectionMessages.notFound || "Collection non trouvée");
  }

  if (!res.ok) {
    console.error(collectionMessages.error);
  }

  return res.json();
}
