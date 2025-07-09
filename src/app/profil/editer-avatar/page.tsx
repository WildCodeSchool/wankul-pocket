import ChoiceAvatar from "@/ui/ChoiceAvatar";
import { getall } from "@/service/ProfilPictureService";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";

export default async function EditAvatarPage() {
  const avatarList: ProfilPictureModel[] = await getall();

  return <ChoiceAvatar avatarList={avatarList} />;
}
