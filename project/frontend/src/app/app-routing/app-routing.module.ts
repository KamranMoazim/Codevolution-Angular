import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Role } from '../enums/role';
import { hasRoleGuard } from '../guards/has-role.guard';

// import { HomeComponent } from '../components/home/home.component';
import { AdminComponent } from '../components/admin/admin.component';
import { UnauthorizedComponent } from '../components/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AllEventsComponent } from '../pages/all-events/all-events.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { OrganizationDetailComponent } from '../pages/organization-detail/organization-detail.component';
import { OrganizationComponent } from '../pages/organization/organization.component';
import { UserAttendEventsComponent } from '../pages/user-attend-events/user-attend-events.component';
import { AdminCreatedEventsComponent } from '../pages/admin-created-events/admin-created-events.component';
import { CreateUpdateEventComponent } from '../pages/create-update-event/create-update-event.component';
import { EventDetailsComponent } from '../pages/event-details/event-details.component';
// import { AttendedEventsComponent } from '../pages/attended-events/attended-events.component';



// import { DepartmentListComponent } from './department-list/department-list.component';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HomeComponent } from './home/home.component';
// import { DepartmentDetailComponent } from './department-detail/department-detail.component';
// import { DepartmentOverviewComponent } from './department-overview/department-overview.component';
// import { DepartmentContactComponent } from './department-contact/department-contact.component';

const routesOld: Routes = [
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // admin routes
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.ADMIN ]
    }
  },
  {
    path: 'admin/events',
    component: AdminCreatedEventsComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.ADMIN ]
    }
  },
  {
    path: 'admin/events/:id',
    component: CreateUpdateEventComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.ADMIN ]
    }
  },



  // user routes
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.ADMIN, Role.USER ]
    }
  },
  {
    path: 'profile/attend-events',
    component: UserAttendEventsComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.USER ]
    }
  },


  // public routes
  { path: 'home', component: HomeComponent },
  { path: 'events', component: AllEventsComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'organizations/:id', component: OrganizationDetailComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'unauthorized', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [DepartmentListComponent, EmployeeListComponent, PageNotFoundComponent];
// export const routingComponents = [
//   HomeComponent,
//   AdminComponent,
//   UnauthorizedComponent,
//   PageNotFoundComponent
// ];
