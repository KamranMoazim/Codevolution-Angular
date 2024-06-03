import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllOrgRequest, AllOrgResponse } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  _url = "http://localhost:5000/api/v1";

  constructor(private httpClient:HttpClient) { }


  getOrganizations(allOrgRequest: AllOrgRequest) : Observable<AllOrgResponse> {
    return this.httpClient.get<AllOrgResponse>(this._url + "/get-organisations");
  }
}
