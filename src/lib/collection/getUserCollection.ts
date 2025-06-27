import { collectionMessages } from "@/data/responseMessages";
import { apiUrl } from "@/data/ROUTES";
import { CardsModel } from "@/model/CardsModel";

export async function getOne(email: string): Promise<CardsModel[]> {
  try {
    const res = await fetch(`${apiUrl}/api/users/${email}/collections`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 404) {
      return [];
    }

    if (!res.ok) {
      console.error(collectionMessages.error);
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de la collection:", error);
    return [];
  }
}
