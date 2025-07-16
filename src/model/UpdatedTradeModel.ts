export interface UpdatedTradeModel {
  id: number;
  status: boolean;
  acceptance: boolean;
  from_user_id: number | undefined;
  to_user_id: number | undefined;
}
