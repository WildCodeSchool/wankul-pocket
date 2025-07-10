import { FriendsModel } from "@/model/FriendsModel";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import { acceptRequest } from "@/service/FriendsService";
import Image from "next/image";

interface Props {
  friend: FriendsModel;
  onAccepted?: () => void;
}

export function AcceptFriendRequestButton({ friend, onAccepted }: Props) {
  const { refreshProgress } = useQuestProgressContext();
  const handleAccept = async () => {
    try {
      await acceptRequest(friend);
      onAccepted?.();
      refreshProgress();
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    }
  };

  return (
    <button onClick={handleAccept}>
      <Image src="/accept.png" alt="Accepter" height={24} width={24} />
    </button>
  );
}
