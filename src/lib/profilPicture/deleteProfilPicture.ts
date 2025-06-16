import { profilPictureMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteProfilPicture(id: number) {
  const res = await fetch(`${apiRoutes.PROFILPICTURES}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(profilPictureMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
