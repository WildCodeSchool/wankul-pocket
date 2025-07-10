export class CompletedQuestsModel {
  constructor(
    private _id: number,
    private _quest_id: number,
    private _user_id: number
  ) {}
  get id(): number {
    return this._id;
  }
  get quest_id(): number {
    return this._quest_id;
  }
  get user_id(): number {
    return this._user_id;
  }
}
