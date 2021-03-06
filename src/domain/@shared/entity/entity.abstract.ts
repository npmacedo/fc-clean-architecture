import { Notification } from "../notification/notification";

export abstract class Entity {
  protected _id: string;
  notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  public get id(): string {
    return this._id;
  }
}
