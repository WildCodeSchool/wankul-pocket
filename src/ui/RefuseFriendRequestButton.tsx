import { refuseFriendRequest } from "@/service/FriendsService";
import Image from "next/image";

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
      <Image src="/refuse.png" alt="Refuser" height={24} width={24} />
    </button>
  );
}
