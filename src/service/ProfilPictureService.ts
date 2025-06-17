import { getProfilPictures } from "@/lib/profilPicture/getProfilPictures";

export async function getall() {
  return getProfilPictures();
}
