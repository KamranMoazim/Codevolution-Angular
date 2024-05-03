import { Component } from '@angular/core';

// here we learned about Services in Angular

@Component({
  selector: 'app-employee-list',
  template: `
  <h2> Employee List </h2>

  <ul *ngFor="let employee of employeeList">
    <li>
      {{ employee.name }}
    </li>
  </ul>
  `,
  styles: [`
  `]
})
export class EmployeeListComponent {

  employeeList = [
    { "id": 1, "name": "Kamran", "age": 25 },
    { "id": 2, "name": "Ali", "age": 30 },
    { "id": 3, "name": "Hassan", "age": 35 },
    { "id": 4, "name": "Shahzaib", "age": 40 }
  ];

}
