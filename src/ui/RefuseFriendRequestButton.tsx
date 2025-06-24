import { refuseFriendRequest } from "@/service/FriendsService";

interface Props {
  id: number;
  onRefused?: () => void;
}

export function RefuseFriendRequestButton({ id, onRefused }: Props) {
  const handleRefuse = async () => {
    await refuseFriendRequest(id);
    onRefused?.();
  };

  return (
    <button onClick={handleRefuse}>
      <img src="/refuse.png" alt="Refuser" />
    </button>
  );
}
