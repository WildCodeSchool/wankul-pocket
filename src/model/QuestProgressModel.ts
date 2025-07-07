export class QuestProgressModel {
  constructor(
    private _bananas: number,
    private _friends_count: number,
    private _trades: number,
    private card_id: number,
    private _card_quantity: number,
    private _card_rarity: string,
    private _card_clan: string
  ) {}

  get bananas(): number {
    return this._bananas;
  }
  get friends(): number {
    return this._friends_count;
  }
  get trades(): number {
    return this._trades;
  }
  get cardId(): number {
    return this.card_id;
  }
  get cardQuantity(): number {
    return this._card_quantity;
  }
  get cardRarity(): string {
    return this._card_rarity;
  }
  get cardClan(): string {
    return this._card_clan;
  }
}
