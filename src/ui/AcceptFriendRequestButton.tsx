import { acceptRequest } from "@/service/FriendsService";
import { FriendsModel } from "@/model/FriendsModel";

interface Props {
  friend: FriendsModel;
  onAccepted?: () => void;
}

export function AcceptFriendRequestButton({ friend, onAccepted }: Props) {
  const handleAccept = async () => {
    try {
      await acceptRequest(friend);
      onAccepted?.();
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
