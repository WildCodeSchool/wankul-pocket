import { acceptRequest } from "@/service/FriendsService";
import { FriendsModel } from "@/model/FriendsModel";
import { useQuestProgressContext } from "@/context/QuestProgressContext";

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
      <img src="/accept.png" alt="Accepter" />
    </button>
  );
}
