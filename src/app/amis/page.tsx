import FriendRequest from "@/ui/FriendRequest";
import { PendingFriendRequest } from "@/ui/PendingFriendRequest";
import DisplayFriendList from "@/ui/DisplayFriendList";
import styles from "./amis.module.css";

export default async function Friends() {
  return (
    <div className={styles.container}>
      <FriendRequest />
      <PendingFriendRequest />
      <DisplayFriendList />
    </div>
  );
}
