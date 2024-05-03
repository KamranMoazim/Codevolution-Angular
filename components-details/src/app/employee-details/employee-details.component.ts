import { Component } from '@angular/core';

// here we learned about Services in Angular

@Component({
  selector: 'app-employee-details',
  template: `
  <h2> Employee Detailed List </h2>

  <ul *ngFor="let employee of employeeList">
    <li>
      {{ employee.id }} - {{ employee.name }} - {{ employee.age }}
    </li>
  </ul>
  `,
  styles: [`
  `]
})
export class EmployeeDetailsComponent {

  employeeList = [
    { "id": 1, "name": "Kamran", "age": 25 },
    { "id": 2, "name": "Ali", "age": 30 },
    { "id": 3, "name": "Hassan", "age": 35 },
    { "id": 4, "name": "Shahzaib", "age": 40 }
  ];

}
