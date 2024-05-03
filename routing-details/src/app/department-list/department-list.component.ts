import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  template: `
    <p>
      department-list works!
    </p>

    <h3>Department List</h3>
    <ul *ngFor="let department of departmentList" class="items" [class.selected]="isSelected(department)">
      <li (click)="selectDepartment(department)">
        <span class="badge">{{ department.id }}</span> {{ department.name }}
      </li>
    </ul>
  `,
  styles: `
    .selected {
      background-color: lightgray;
    }
  `
})
export class DepartmentListComponent implements OnInit {

  selectedId: number = 0;

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap) => {
      let id = parseInt(params.get('id')!);
      this.selectedId = id;
    });
  }

  departmentList = [
    { "id": 1, "name": "Angular" },
    { "id": 2, "name": "Node" },
    { "id": 3, "name": "MongoDB" },
    { "id": 4, "name": "Ruby" },
    { "id": 5, "name": "Bootstrap" }
  ];

  selectDepartment(department: any) {
    this.router.navigate(['/departments', department.id]);
    // this.router.navigate([department.id], { relativeTo: this.route })
  }

  isSelected(department: any) {
    return department.id === this.selectedId;
  }
}
