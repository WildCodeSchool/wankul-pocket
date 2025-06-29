import { collectionMessages } from "@/data/responseMessages";
import { apiUrl } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";

interface GetOneOptions {
  rarity?: string;
}

export async function getOne(
  email: string,
  options: GetOneOptions = {}
): Promise<CardsModel[]> {
  const { rarity } = options;

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
