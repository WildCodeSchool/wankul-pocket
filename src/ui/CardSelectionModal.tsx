import { FriendsModel } from "@/model/FriendsModel";
import { getCollection } from "@/service/CollectionService";
import { useEffect } from "react";

type TradeAddProps = {
  selectedFriend: FriendsModel | null;
};

export default function CardSelectionModal({ selectedFriend }: TradeAddProps) {
  return <div>MODAL</div>;
}
