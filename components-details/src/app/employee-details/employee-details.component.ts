import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

// here we learned about Services in Angular

@Component({
  selector: 'app-employee-details',
  template: `
  <h2> Employee Detailed List </h2>

  <h3> {{ errorMessage }} </h3>

  <ul *ngFor="let employee of employeeList">
    <li>
      {{ employee.id }} - {{ employee.name }} - {{ employee.age }}
    </li>
  </ul>
  `,
  styles: [`
  `]
})
export class EmployeeDetailsComponent implements OnInit {

  // employeeList = [
  //   { "id": 1, "name": "Kamran", "age": 25 },
  //   { "id": 2, "name": "Ali", "age": 30 },
  //   { "id": 3, "name": "Hassan", "age": 35 },
  //   { "id": 4, "name": "Shahzaib", "age": 40 }
  // ];

  employeeList = [];
  errorMessage = '';

  constructor(private _employeeService:EmployeeService) { }

  ngOnInit(): void {
    // this.employeeList = this._employeeService.getEmployees();
    this._employeeService.getEmployees()
      .subscribe(
        data => this.employeeList = data,
        error => this.errorMessage = error
      );
  }


}
