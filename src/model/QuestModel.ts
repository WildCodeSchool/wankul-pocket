export class QuestModel {
  constructor(
    private _id: number,
    private _name: string,
    private _mission: string,
    private _reward: number,
    private _category: string,
    private _goal_target: number,
    private _goal_quantity: number,
    private _quest_type: string,
    private _id_completed?: number,
    private _quest_id_completed?: number,
    private _user_id_completed?: number
  ) {}
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get mission(): string {
    return this._mission;
  }
  get reward(): number {
    return this._reward;
  }
  get category(): string {
    return this._category;
  }
  get goal_target(): number {
    return this._goal_target;
  }
  get goal_quantity(): number {
    return this._goal_quantity;
  }
  get quest_type(): string {
    return this._quest_type;
  }
  get id_completed(): number | undefined {
    return this._id_completed;
  }
  get quest_id_completed(): number | undefined {
    return this._quest_id_completed;
  }
  get user_id_completed(): number | undefined {
    return this._user_id_completed;
  }
}
