import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProfileResponse, UpdateProfileRequest } from '../../models/User';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }


  getProfile() :Observable<GetProfileResponse>  {
    // return this.httpClient.get<GetProfileResponse>(this._url + "/user-info/", {
    //   withCredentials: true,
    // }).pipe(catchError(this.errorHandler));
    return this.httpClient.get<GetProfileResponse>(this._url + "/user-info/").pipe(catchError(this.errorHandler));
  }

  updateProfile(data: UpdateProfileRequest) : Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(this._url + "/user-info/", data).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

}
