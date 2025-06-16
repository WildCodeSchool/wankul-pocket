import { apiRoutes } from "@/data/ROUTES";
import { profilPictureMessages } from "@/data/responseMessages";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";

export async function patchProfilPicture(
  profilPicture: ProfilPictureModel
): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.PROFILPICTURES, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(profilPicture),
  });

  if (res.status === 404) {
    throw new Error(profilPictureMessages.notFound || "Image non trouvée");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg =
      (data as { error?: string }).error || profilPictureMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
