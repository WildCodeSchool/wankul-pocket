import { UpdatedCard, patchCollection } from "@/lib/collection/patchCollection";
import { addTrade } from "@/lib/trade/addTrade";
import { deleteTrade } from "@/lib/trade/deleteTrade";
import { getOne } from "@/lib/trade/getTrade";
import { getTrades } from "@/lib/trade/getTrades";
import { patchTrade } from "@/lib/trade/patchTrade";
import { TradeModel } from "@/model/TradeModel";

interface newTradeModel {
  from_user_id: number | undefined;
  to_user_id: number | undefined;
  offered_card_id: number | undefined;
  requested_card_id: number | undefined;
  status: boolean;
  acceptance: null;
}

interface UpdatedTradeModel {
  id: number;
  status: boolean;
  acceptance: boolean;
}

type TradeType = "received" | "sent";

export async function addOne(email: string | undefined, trade: newTradeModel) {
  return addTrade(email, trade);
}

export async function getall(email: string, type: TradeType = "received") {
  return getTrades(email, type);
}

export async function getOneByEmail(email: string): Promise<TradeModel> {
  return getOne(email);
}

export async function deleteOne(email: string, id: number) {
  return deleteTrade(email, id);
}

export async function editOne(
  email: string,
  trade: UpdatedTradeModel
): Promise<{ message: string }> {
  return patchTrade(email, trade);
}

export async function editCollection(
  email: string,
  updatedCard: UpdatedCard
): Promise<{ message: string }> {
  return patchCollection(email, updatedCard);
}
