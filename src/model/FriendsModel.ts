export class FriendsModel {
  constructor(
    private _id: number,
    private _user_profil_id: string,
    private _friend_profil_id: string,
    private _status: boolean,
    private _acceptance: boolean,
    private _user_username?: string,
    private _friend_username?: string,
    private _user_email?: string,
    private _friend_email?: string,
    private _user_image_path?: string,
    private _friend_image_path?: string
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

  get user_username(): string | undefined {
    return this._user_username;
  }

  get friend_username(): string | undefined {
    return this._friend_username;
  }

  get user_email(): string | undefined {
    return this._user_email;
  }

  get friend_email(): string | undefined {
    return this._friend_email;
  }

  get user_image_path(): string | undefined {
    return this._user_image_path;
  }

  get friend_image_path(): string | undefined {
    return this._friend_image_path;
  }
}
