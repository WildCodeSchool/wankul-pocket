import { deleteTrade } from "@/lib/trade/deleteTrade";
import { getOne } from "@/lib/trade/getTrade";
import { getTrades } from "@/lib/trade/getTrades";
import { patchTrade } from "@/lib/trade/patchTrade";
import { TradeModel } from "@/model/TradeModel";

export async function getall(email: string) {
  return getTrades(email);
}

export async function getOneByEmail(email: string): Promise<TradeModel> {
  return getOne(email);
}

export async function deleteOne(email: string, id: number) {
  return deleteTrade(email, id);
}

export async function editOne(
  email: string,
  trade: TradeModel
): Promise<{ message: string }> {
  return patchTrade(email, trade);
}
