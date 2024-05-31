import { Event } from "./Event";
import { User } from "./User";


export class Review {
  constructor(
    public _id: string,
    public event?: Event,
    public user?: User,
    public rating?: number,
    public comment?: string,
    // public date: Date,
  ) {}
}
