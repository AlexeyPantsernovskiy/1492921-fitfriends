export abstract class PgEntity {
  private _id = null;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
}
