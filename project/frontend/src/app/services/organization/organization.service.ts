import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AllOrgRequest, AllOrgResponse } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }


  getOrganizations(allOrgRequest: AllOrgRequest) : Observable<AllOrgResponse> {
    // return this.httpClient.get<AllOrgResponse>(this._url + "/get-organizations");

    const params = {
    }

    if (allOrgRequest.search) {
      params['search'] = allOrgRequest.search;
    }

    if (allOrgRequest.page) {
      params['page'] = allOrgRequest.page;
    }

    if (allOrgRequest.limit) {
      params['limit'] = allOrgRequest.limit;
    }

    console.log(params)

    return this.httpClient.get<AllOrgResponse>(this._url + "/get-organizations", {
      params
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error)
    // return throwError(() => error.message || "Server Error");
    return throwError(() => error.error.message || "Server Error");
  }
}
