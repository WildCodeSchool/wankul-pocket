import { profilPictureMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";

export async function getOne(id: number): Promise<ProfilPictureModel> {
  const res = await fetch(`${apiRoutes.PROFILPICTURES}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(profilPictureMessages.notFound || "Image non trouvée");
  }

  if (!res.ok) {
    throw new Error(profilPictureMessages.error);
  }

  return res.json();
}
