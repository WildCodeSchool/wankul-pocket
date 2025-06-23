export class FriendsModel {
  constructor(
    private _id: number,
    private _user_profil_id: string,
    private _friend_profil_id: string,
    private _status: boolean,
    private _acceptance: boolean
  ) {}

  get id(): number {
    return this._id;
  }

  get user_profil_id(): string {
    return this._user_profil_id;
  }

  get friend_profil_id(): string {
    return this._friend_profil_id;
  }

  get status(): boolean {
    return this._status;
  }

  get acceptance(): boolean {
    return this._acceptance;
  }

  set status(value: boolean) {
    this._status = value;
  }

  set acceptance(value: boolean) {
    this._acceptance = value;
  }
}
