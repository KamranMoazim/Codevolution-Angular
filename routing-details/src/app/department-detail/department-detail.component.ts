import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  template: `
    <p>
      department-detail works!
    </p>

    <h2>
      You selected department with id = {{ id }}
    </h2>

    <router-outlet></router-outlet>

    <div>
      <button (click)="goToOverview()">OverView</button>
      <button (click)="goToContact()">Contact</button>
    </div>

    <div>
      <button (click)="goPrevious()">Previous</button>
      <button (click)="goNext()">Next</button>
    </div>

    <button (click)="back()">
      Back
    </button>
  `,
  styles: ``
})
export class DepartmentDetailComponent implements OnInit {

  id: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.paramMap.get('id')!); // this is not recommended because it will not work if the same component is reused
    // this.id = id;

    this.route.paramMap.subscribe((params:ParamMap) => {
      let id = parseInt(params.get('id')!);
      this.id = id;
    });
  }

  goNext() {
    let nextId = this.id + 1;
    this.router.navigate(['/departments', nextId]);
    // this.router.navigate([nextId], { relativeTo: this.route }); // this will not work because it will append the id to the current route
  }

  goPrevious() {
    let previousId = this.id - 1;
    this.router.navigate(['/departments', previousId]);
    // this.router.navigate([previousId], { relativeTo: this.route }); // this will not work because it will append the id to the current route
  }

  back() {
    let selectedId = this.id ? this.id : null;
    // this.router.navigate(['/departments', { id: selectedId, test: 'testValue' }]); // you can send query params as many as you want
    this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route });
  }

  goToOverview() {
    this.router.navigate(['overview'], { relativeTo: this.route });
  }

  goToContact() {
    this.router.navigate(['contact'], { relativeTo: this.route });
  }


}
