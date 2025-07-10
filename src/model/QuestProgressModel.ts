export class QuestProgressModel {
  constructor(
    private user_id: number,
    private _bananas: number,
    private _friends_count: number,
    private _trades_count: number,
    private _collection: Array<{
      card_id: number;
      quantity: number;
      rarity: string;
      name: string;
      clan: string;
    }>
  ) {}
  get userId(): number {
    return this.user_id;
  }

  get bananas(): number {
    return this._bananas;
  }
  get friends(): number {
    return this._friends_count;
  }
  get trades(): number {
    return this._trades_count;
  }

  get collection(): Array<{
    card_id: number;
    quantity: number;
    rarity: string;
    name: string;
    clan: string;
  }> {
    return this._collection;
  }
}
