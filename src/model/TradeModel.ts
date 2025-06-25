export class TradeModel {
  constructor(
    private _id: number,
    private _from_username: string,
    private _from_user_email: string,
    private _to_username: string,
    private _to_user_email: string,
    private _from_user_id: number,
    private _to_user_id: number,
    private _from_user_avatar: string,
    private _offered_card_img: string,
    private _requested_card_img: string,
    private _offered_card_id: number,
    private _requested_card_id: number,
    private _offered_card_quantity: number,
    private _requested_card_quantity: number,
    private _status: boolean,
    private _acceptance: boolean
  ) {}

  get id(): number {
    return this._id;
  }

  get from_user_id(): number {
    return this._from_user_id;
  }

  set from_user_id(value: number) {
    this._from_user_id = value;
  }

  get to_user_id(): number {
    return this._to_user_id;
  }

  set to_user_id(value: number) {
    this._to_user_id = value;
  }

  get from_username(): string {
    return this._from_username;
  }

  set from_username(value: string) {
    this._from_username = value;
  }

  get from_user_email(): string {
    return this._from_user_email;
  }

  set from_user_email(value: string) {
    this._from_user_email = value;
  }

  get to_username(): string {
    return this._to_username;
  }

  set to_username(value: string) {
    this._to_username = value;
  }

  get to_user_email(): string {
    return this._to_user_email;
  }

  set to_user_email(value: string) {
    this._to_user_email = value;
  }

  get from_user_avatar(): string {
    return this._from_user_avatar;
  }

  get offered_card_img(): string {
    return this._offered_card_img;
  }

  get requested_card_img(): string {
    return this._requested_card_img;
  }

  get offered_card_id(): number {
    return this._offered_card_id;
  }

  set offered_card_id(value: number) {
    this._offered_card_id = value;
  }

  get offered_card_quantity(): number {
    return this._offered_card_quantity;
  }

  set offered_card_quantity(value: number) {
    this._offered_card_quantity = value;
  }

  get requested_card_id(): number {
    return this._requested_card_id;
  }

  set requested_card_id(value: number) {
    this._requested_card_id = value;
  }

  get requested_card_quantity(): number {
    return this._requested_card_quantity;
  }

  set requested_card_quantity(value: number) {
    this._requested_card_quantity = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  get acceptance(): boolean {
    return this._acceptance;
  }

  set acceptance(value: boolean) {
    this._acceptance = value;
  }
}
