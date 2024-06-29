import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Role } from '../../enums/role';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../../models/Auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // _url = process.env.API_URL;
  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }


  getUserRole(): Role {
    /**
    * fake an API call
    */
    // return Role.USER;
    // return Role.ADMIN;

    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return null;
    } else if (user.role === "admin") {
      return Role.ADMIN;
    } else if (user.role === "user") {
      return Role.USER;
    } else {
      return null;
    }
  }

  resgisterUser(registerRequest: RegisterRequest): Observable<RegisterResponse>{
    // return this.httpClient.post(this._url, {}).pipe(catchError(this.errorHandler));
    return this.httpClient.post<RegisterResponse>(this._url + "/register", registerRequest, { withCredentials: true })
                          .pipe(catchError(this.errorHandler));
  }

  // create a login method that will login user and save data to local storage
  loginUser(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this._url + "/login", loginRequest, { withCredentials: true })
                          .pipe(
                            catchError(this.errorHandler),
                            tap((response: LoginResponse) => {
                              if (response.success) {
                                localStorage.setItem('accessToken', response.data.accessToken);
                                localStorage.setItem('user', JSON.stringify(response.data.user));
                              }
                            })
                          );
  }

  logoutUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // clear all cookies
    this.clearAllCookies();
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }

  private clearAllCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      console.log(name)
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
    console.log("cookie cleared")
  }
}
