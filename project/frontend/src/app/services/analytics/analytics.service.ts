import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse';
import { LineOrBarChartResponse, TotalRevenueResponse } from '../../models/Analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  // _url = process.env.API_URL;
  _url = "http://localhost:5000/api/v1";

  // http://localhost:5000/api/v1/analytics/event/667c3ac6588d2f49935369e9/

  constructor(private httpClient:HttpClient) { }

  // CreateTicketRequest
  buyTicket(eventId:string) : Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(this._url + "/buy-ticket/", {
      eventId
    })
    .pipe(catchError(this.errorHandler));
  }


  getLast30DaysTicketBoughtAnalytics(eventId: string) : Observable<LineOrBarChartResponse>{
    return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/event/${eventId}/tickets/`).pipe(catchError(this.errorHandler));
  }


  getEachStarCountAnalytics(eventId: string) : Observable<LineOrBarChartResponse>{
    return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/event/${eventId}/ratings/`).pipe(catchError(this.errorHandler));
  }




  getLast12MonthsEventCreationCountAnalytics() : Observable<LineOrBarChartResponse>{
    return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/events/event-count/`).pipe(catchError(this.errorHandler));
  }

  getUniqueCategoriesWithEventCountAnalytics() : Observable<LineOrBarChartResponse>{
    return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/events/categories/`).pipe(catchError(this.errorHandler));
  }

  getEachStarCountForAllEventsAnalytics() : Observable<LineOrBarChartResponse>{
    return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/events/each-star-ratings/`).pipe(catchError(this.errorHandler));
  }

  // getAllEventsTimeOfTheDayAnalytics() : Observable<LineOrBarChartResponse>{
  //   return this.httpClient.get<LineOrBarChartResponse>(`${this._url}/analytics/events/times/`).pipe(catchError(this.errorHandler));
  // }

  getTotalRevenueAnalytics() : Observable<TotalRevenueResponse>{
    return this.httpClient.get<TotalRevenueResponse>(`${this._url}/analytics/events/total-revenue/`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

}
