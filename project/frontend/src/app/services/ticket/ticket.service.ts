import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // _url = process.env.API_URL;
  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }

  // CreateTicketRequest
  buyTicket(eventId:string) : Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(this._url + "/buy-ticket/", {
      eventId
    })
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

}
