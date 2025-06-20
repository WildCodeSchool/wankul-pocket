export class ProfilPictureModel {
  constructor(private _id: number, private _image_path: string) {}

  get id(): number {
    return this._id;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }
}
