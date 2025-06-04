export class InfoModel {
  constructor(
    private _id: number,
    private _title: string,
    private _content: string
  ) {}

  get id(): number {
    return this._id
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get content(): string {
    return this._content
  }

  set content(value: string) {
    this._content = value
  }
}
