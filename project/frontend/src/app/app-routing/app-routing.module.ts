// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DepartmentListComponent } from './department-list/department-list.component';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HomeComponent } from './home/home.component';
// import { DepartmentDetailComponent } from './department-detail/department-detail.component';
// import { DepartmentOverviewComponent } from './department-overview/department-overview.component';
// import { DepartmentContactComponent } from './department-contact/department-contact.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    redirectTo: '/departments',
    pathMatch: 'full' // This is important to avoid matching the empty string with every route
    // pathMatch: 'prefix' // This is the default value
    // This will match the empty string with every route so it will always redirect to the department route always

    // pathMatch: 'full' // This will match the empty string only with the empty path
  },
  // {
  //   path: 'departments',
  //   component: DepartmentListComponent
  // },
  // {
  //   path: 'departments/:id',
  //   component: DepartmentDetailComponent
  // },
  // {
  //   path: 'departments/:id',
  //   component: DepartmentDetailComponent,
  //   children: [
  //     {
  //       path: 'overview',
  //       component: DepartmentOverviewComponent
  //     },
  //     {
  //       path: 'contact',
  //       component: DepartmentContactComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'employees',
  //   component: EmployeeListComponent
  // },
  // {
  //   path: "**", // Wildcard route it must be at the end
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [DepartmentListComponent, EmployeeListComponent, PageNotFoundComponent];
export const routingComponents = [];
