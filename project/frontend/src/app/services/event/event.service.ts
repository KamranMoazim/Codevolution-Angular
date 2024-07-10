import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AllEventsRequest, AllEventsResponse, CreateOrUpdateEventRequest, CreateOrUpdateEventResponse, SingleEventDetailssResponse } from '../../models/Event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }

  getEvents(allEventsRequest: AllEventsRequest) : Observable<AllEventsResponse> {
    // return this.httpClient.get<AllEventsResponse>(this._url + "/events")
    //           .pipe(catchError(this.errorHandler));

    // console.log(allEventsRequest)

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

    if (allEventsRequest.isOrganizer) {
      params['isOrganizer'] = allEventsRequest.isOrganizer;
    } else {
      params['isOrganizer'] = allEventsRequest.isOrganizer;
      params['organizer'] = allEventsRequest.organizer;

    }

    if (allEventsRequest.isUser) {
      params['isUser'] = allEventsRequest.isUser;
    }

    // if (allEventsRequest.minReviews) {
    //   params['minReviews'] = allEventsRequest.minReviews;
    // }

    // if (allEventsRequest.maxReviews) {
    //   params['maxReviews'] = allEventsRequest.maxReviews;
    // }

    console.log(params)

    return this.httpClient.get<AllEventsResponse>(this._url + "/event", {
      params
    })
    .pipe(
        map(response => {
          const customResponse: any = {
            ...response,
            data:{
              ...response.data,
              events: response.data.events.map(event => {
                return {
                  ...event,
                  startTime: this.convertToAMPM(parseInt(event.startTime)),
                  endTime: this.convertToAMPM(parseInt(event.endTime)),
                }
              })
            }
          };
          return customResponse;
        }),
        catchError(this.errorHandler));
  }


  // getEventDetails(eventId:string) : Observable<SingleEventDetailssResponse> {
  getEventDetails(eventId:string) : Observable<SingleEventDetailssResponse> {
    return this.httpClient.get<SingleEventDetailssResponse>(this._url + "/event/" + eventId)
    .pipe(
      map(response => {
        const customResponse: any = {
          ...response,
          data:{
            ...response.data,
            event: {
              ...response.data.event,
              // startTime: this.convertMinutesToTimeFormat(parseInt(response.data.event.startTime)),
              // endTime: this.convertMinutesToTimeFormat(parseInt(response.data.event.endTime)),

              startTime: this.convertMinutesToTimeFormat(parseInt(response.data.event.startTime)),
              endTime: this.convertMinutesToTimeFormat(parseInt(response.data.event.endTime)),
            }
          }
        };
        return customResponse;
      }),
      catchError(this.errorHandler));
  }


  createOrUpdateEvent(eventData: CreateOrUpdateEventRequest) : Observable<CreateOrUpdateEventResponse> {
    return this.httpClient.post<CreateOrUpdateEventResponse>(this._url + "/event", eventData).pipe(catchError(this.errorHandler));
  }

  isThisMyEvent(eventId: string): Observable<{
    data: {
      isMyEvent: boolean;
    }
  }> {
    return this.httpClient.get<{
      data: {
        isMyEvent: boolean;
      }
    }>(this._url + "/is-my-event/" + eventId).pipe(catchError(this.errorHandler));
  }



  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

  convertToAMPM(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    let newhours = `${hours}`;
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // const strMins = mins < 10 ? '0' + mins : mins;
    // return `${hours}:${strMins} ${ampm}`;
    if (hours < 10) {
      newhours = '0' + hours;
    }
    return `${newhours}:${mins}`;
  }

  // time-format.util.ts
convertMinutesToTimeFormat(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = mins < 10 ? `0${mins}` : mins;
  return `${adjustedHours}:${formattedMinutes} ${period}`;
}





}

