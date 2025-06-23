export class UserModel {
  constructor(
    private _id: number,
    private _username: string,
    private _email: string,
    private _created_at: Date,
    private _bananas: number,
    private _profil_picture_id: number,
    private _profil_id: string,
    private _profil_picture_url: string
  ) {}

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get bananas(): number {
    return this._bananas;
  }

  set bananas(value: number) {
    this._bananas = value;
  }

  get profil_picture_id(): number {
    return this._profil_picture_id;
  }

  set profil_picture_id(value: number) {
    this._profil_picture_id = value;
  }

  get profil_id(): string {
    return this._profil_id;
  }

  get profil_picture_url(): string {
    return this._profil_picture_url;
  }

  set profil_picture_url(value: string) {
    this._profil_picture_url = value;
  }
}
