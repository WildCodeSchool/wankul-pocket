import FriendRequest from "@/ui/FriendRequest";
import { PendingFriendRequest } from "@/ui/PendingFriendRequest";
import DisplayFriendList from "@/ui/DisplayFriendList";

export default async function Amis() {
  return (
    <div>
      <FriendRequest />
      <PendingFriendRequest />
      <DisplayFriendList />
    </div>
  );
}
