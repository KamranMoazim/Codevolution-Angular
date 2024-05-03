import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// step 1: create a service
// step 2: register the service in the app.module.ts file
// step 3: import the service in the component where you want to use it
// step 4: define a property in the component and assign the service to it
// step 5: use the property in the template


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _url = '/assets/data/employees.json';

  constructor(private httpClient:HttpClient) { }

  // getEmployees() {
  //   return [
  //     { "id": 1, "name": "Kamran", "age": 25 },
  //     { "id": 2, "name": "Ali", "age": 30 },
  //     { "id": 3, "name": "Hassan", "age": 35 },
  //     { "id": 4, "name": "Shahzaib", "age": 40 }
  //   ];
  // }

  getEmployees() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this._url)
                          .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(() => error.message || "Server Error");
    // return new Error(error.message || "Server Error");
  }

}
