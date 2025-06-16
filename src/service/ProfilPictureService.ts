import { addProfilPicture } from "@/lib/profilPicture/addProfilPicture";
import { deleteProfilPicture } from "@/lib/profilPicture/deleteProfilPicture";
import { getOne } from "@/lib/profilPicture/getProfilPicture";
import { getProfilPictures } from "@/lib/profilPicture/getProfilPictures";
import { patchProfilPicture } from "@/lib/profilPicture/patchProfilPicture";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";

export async function getall() {
  return getProfilPictures();
}

export async function getOneById(id: number): Promise<ProfilPictureModel> {
  return getOne(id);
}

export async function deleteOne(id: number) {
  return deleteProfilPicture(id);
}

export async function addOne(profilPicture: Omit<ProfilPictureModel, "id">) {
  return addProfilPicture(profilPicture);
}

export async function editOne(
  profilPicture: ProfilPictureModel
): Promise<{ message: string }> {
  return patchProfilPicture(profilPicture);
}
