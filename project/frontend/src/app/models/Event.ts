import { Review } from "./Review";
import { User } from "./User";



export class Event {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public date: Date,
    public startTime: string,
    public endTime: string,
    public location: string,
    public organizer: User,
    public image: string,
    public capacity: number,
    public category: string,
    public ticketPrice: number,
    public status: string,
    public media: string[],
    public reviews: Review[],
  ) {}
}
