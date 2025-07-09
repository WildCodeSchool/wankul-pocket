export const dynamic = "force-dynamic";

import { ProfilPictureModel } from "@/model/ProfilPictureModel";
import { getall } from "@/service/ProfilPictureService";
import ChoiceAvatar from "@/ui/ChoiceAvatar";

export default async function EditAvatarPage() {
  let avatarList: ProfilPictureModel[] = [];
  try {
    avatarList = await getall();
  } catch (err) {
    console.error("Erreur de fetch", err);
  }

  return <ChoiceAvatar avatarList={avatarList} />;
}
