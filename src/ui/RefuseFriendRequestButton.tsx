import { refuseFriendRequest } from "@/service/FriendsService";
import { friendsMessages } from "@/data/responseMessages";

interface Props {
  id: number;
  onRefused?: () => void;
}

export function RefuseFriendRequestButton({ id, onRefused }: Props) {
  const handleRefuse = async () => {
    try {
      await refuseFriendRequest(id);
      onRefused?.();
    } catch (error) {
      console.error("Failed to refuse friend request:", error);
    }
  };

  return (
    <button onClick={handleRefuse}>
      <img src="/refuse.png" alt="Refuser" />
    </button>
  );
}
