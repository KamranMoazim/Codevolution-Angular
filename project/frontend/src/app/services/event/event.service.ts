import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AllEventsRequest, AllEventsResponse } from '../../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }

  getEvents(allEventsRequest: AllEventsRequest) : Observable<AllEventsResponse> {
    // return this.httpClient.get<AllEventsResponse>(this._url + "/events")
    //           .pipe(catchError(this.errorHandler));

    console.log(allEventsRequest)

    let params = {}

    if (allEventsRequest.search) {
      params['search'] = allEventsRequest.search;
    }

    if (allEventsRequest.page) {
      params['page'] = allEventsRequest.page;
    }

    if (allEventsRequest.limit) {
      params['limit'] = allEventsRequest.limit;
    }

    if (allEventsRequest.sortBy) {
      params['sortBy'] = allEventsRequest.sortBy;
    }

    if (allEventsRequest.sortOrder) {
      params['sortOrder'] = allEventsRequest.sortOrder;
    }

    if (allEventsRequest.minPrice) {
      params['minPrice'] = allEventsRequest.minPrice;
    }

    if (allEventsRequest.maxPrice) {
      params['maxPrice'] = allEventsRequest.maxPrice;
    }

    if (allEventsRequest.status) {
      params['status'] = allEventsRequest.status;
    }

    if (allEventsRequest.startDate) {
      params['startDate'] = allEventsRequest.startDate;
    }

    if (allEventsRequest.endDate) {
      params['endDate'] = allEventsRequest.endDate;
    }

    if (allEventsRequest.startTime) {
      params['startTime'] = allEventsRequest.startTime;
    }

    if (allEventsRequest.endTime) {
      params['endTime'] = allEventsRequest.endTime;
    }

    if (allEventsRequest.minReviews) {
      params['minReviews'] = allEventsRequest.minReviews;
    }

    if (allEventsRequest.maxReviews) {
      params['maxReviews'] = allEventsRequest.maxReviews;
    }

    console.log(params)

    return this.httpClient.get<AllEventsResponse>(this._url + "/event", {
      // params: {
        // search: allEventsRequest.search,
        // page: allEventsRequest.page,
        // limit: allEventsRequest.limit,
        // sortBy: allEventsRequest.sortBy,
        // sortOrder: allEventsRequest.sortOrder,
        // minPrice: allEventsRequest.minPrice,
        // maxPrice: allEventsRequest.maxPrice,
        // status: allEventsRequest.status,
        // // date: allEventsRequest.date,
        // startDate: allEventsRequest.startDate,
        // endDate: allEventsRequest.endDate,
        // startTime: allEventsRequest.startTime,
        // endTime: allEventsRequest.endTime,
        // // location: allEventsRequest.location,
        // minReviews: allEventsRequest.minReviews,
        // maxReviews: allEventsRequest.maxReviews,
      // }
      params
    }).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

}
