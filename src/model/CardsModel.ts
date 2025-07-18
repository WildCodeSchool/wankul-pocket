export class CardsModel {
  constructor(
    private _id: number,
    private _name: string,
    private _image_path: string,
    private _card_number: number,
    private _clan: string,
    private _rarity: string,
    private _drop_rate: number,
    private _official_rate: number,
    private _is_holo: boolean,
    private _quote: string,
    private _booster_id: number,
    private _quantity: number,
    private _season: number,
    private _set_name: string,
    private _user_id?: number
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get image_path(): string {
    return this._image_path;
  }

  get card_number(): number {
    return this._card_number;
  }

  get clan(): string {
    return this._clan;
  }

  get rarity(): string {
    return this._rarity;
  }

  get drop_rate(): number {
    return this._drop_rate;
  }

  get official_rate(): number {
    return this._official_rate;
  }

  get is_holo(): boolean {
    return this._is_holo;
  }

  get quote(): string {
    return this._quote;
  }

  get booster_id(): number {
    return this._booster_id;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get season(): number {
    return this._season;
  }

  get set_name(): string {
    return this._set_name;
  }

  get user_id(): number | undefined {
    return this._user_id;
  }
}
