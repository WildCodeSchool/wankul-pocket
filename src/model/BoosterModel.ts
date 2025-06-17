export class BoosterModel {
  constructor(
    private _id: number,
    private _name: string,
    private _image: string,
    private _season: number,
    private _set_name: string
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
  }

  get season(): number {
    return this._season;
  }

  get set_name(): string {
    return this._set_name;
  }
}
