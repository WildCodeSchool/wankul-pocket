import { FriendsModel } from "@/model/FriendsModel";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import { acceptRequest } from "@/service/FriendsService";
import { useFriendListContext } from "@/context/FriendListContext";
import Image from "next/image";

interface Props {
  friend: FriendsModel;
  onAccepted?: () => void;
}

export function AcceptFriendRequestButton({ friend, onAccepted }: Props) {
  const { refreshFriends } = useFriendListContext();
  const { refreshProgress } = useQuestProgressContext();

  const handleAccept = async () => {
    try {
      await acceptRequest(friend);
      onAccepted?.();
      refreshProgress();
      refreshFriends();
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
