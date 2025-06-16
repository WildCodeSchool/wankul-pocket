import { profilPictureMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getProfilPictures() {
  const res = await fetch(apiRoutes.PROFILPICTURES, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(profilPictureMessages.error);
  return res.json();
}
