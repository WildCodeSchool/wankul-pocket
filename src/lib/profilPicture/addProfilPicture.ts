import { profilPictureMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addProfilPicture(profilPicture: { image_path: string }) {
  const res = await fetch(apiRoutes.PROFILPICTURES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profilPicture),
  });

  if (!res.ok) throw new Error(profilPictureMessages.addFail);
  return res.json();
}
