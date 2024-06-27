import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AllReviewsResponse, CreateReviewRequest, CreateReviewResponse } from '../../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // _url = process.env.API_URL;
  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }

  getAllReviews(eventId: string, page: number, limit: number, rating?:number) : Observable<AllReviewsResponse>{
    console.log(`${this._url}/review/event/${eventId}/?page=${page}&limit=${limit}`)
    if (rating === undefined) {
      return this.httpClient.get<AllReviewsResponse>(`${this._url}/review/event/${eventId}/?page=${page}&limit=${limit}`).pipe(catchError(this.errorHandler));
    }
    return this.httpClient.get<AllReviewsResponse>(`${this._url}/review/event/${eventId}/?page=${page}&limit=${limit}&rating=${rating}`).pipe(catchError(this.errorHandler));
    // /review/event/:id
  }

  // CreateReviewRequest

  addReview(createReviewData:CreateReviewRequest) : Observable<CreateReviewResponse> {
    console.log(createReviewData)
    return this.httpClient.post<CreateReviewResponse>(this._url + "/review/event/", createReviewData)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

}
