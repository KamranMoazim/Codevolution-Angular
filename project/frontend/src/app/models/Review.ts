import { BaseResponse } from "./BaseResponse";
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


export class AllReviewsResponse extends BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data: {
      reviews: Review[],
      total: number,
    }
  ) {
    super(success, message);
  }
}


export class CreateReviewRequest {
  constructor(
    public eventId?: string,
    public rating?: number,
    public comment?: string,
  ) {}
}


export class CreateReviewResponse extends BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data: {
      review: Review
    }
  ) {
    super(success, message);
  }
}
