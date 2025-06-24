import { acceptRequest } from "@/service/FriendsService";
import { FriendsModel } from "@/model/FriendsModel";

interface Props {
  friend: FriendsModel;
  onAccepted?: () => void;
}

export function AcceptFriendRequestButton({ friend, onAccepted }: Props) {
  const handleAccept = async () => {
    await acceptRequest(friend);
    onAccepted?.();
  };

  return (
    <button onClick={handleAccept}>
      <img src="/accept.png" alt="Accepter" />
    </button>
  );
}
