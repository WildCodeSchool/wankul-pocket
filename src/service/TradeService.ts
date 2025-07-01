import { UpdatedCard, patchCollection } from "@/lib/collection/patchCollection";
import { addTrade } from "@/lib/trade/addTrade";
import { deleteTrade } from "@/lib/trade/deleteTrade";
import { getOne } from "@/lib/trade/getTrade";
import { getTrades } from "@/lib/trade/getTrades";
import { patchTrade } from "@/lib/trade/patchTrade";
import { newTradeModel } from "@/model/NewTradeModel";
import { TradeModel } from "@/model/TradeModel";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";

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
