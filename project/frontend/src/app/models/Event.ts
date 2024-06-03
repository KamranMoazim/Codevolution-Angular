import { BaseResponse } from "./BaseResponse";
import { Review } from "./Review";
import { User } from "./User";



export class Event {
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public date?: Date,
    public startTime?: string,
    public endTime?: string,
    public location?: string,
    public organizer?: User,
    public capacity?: number,
    public category?: string,
    public ticketPrice?: number,
    public status?: string,
    public media?: string[],
    public reviews?: Review[],
    // public image?: string,
  ) {}
}

// const {
//   search,
//   page = 1,
//   limit = 15,
//   sortBy = 'date',
//   sortOrder = 'asc',
//   minPrice,
//   maxPrice,
//   category,
//   date,
//   startTime,
//   endTime,
//   location,
//   minReviews,
//   maxReviews
// } = req.query;

export class AllEventsRequest {
  constructor(
    public search?: string,
    public page?: number,
    public limit?: number,
    public sortBy: string = 'date',
    public sortOrder: string = 'asc',
    public minPrice?: number,
    public maxPrice?: number,
    public status?: string,
    // public date: {
    //   start: string,
    //   end: string
    // },
    public startDate?: string,
    public endDate?: string,
    public startTime?: string,
    public endTime?: string,
    public minReviews?: number,
    public maxReviews?: number,
  ) {}
}


export class AllEventsResponse extends BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data: {
      events: Event[],
      page: number,
      totalPages: number,
    }
  ) {
    super(success, message);
  }
}
