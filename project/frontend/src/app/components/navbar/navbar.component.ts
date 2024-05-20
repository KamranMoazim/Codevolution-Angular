import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  adminRoutes = [
    { path: '/admin/dashboard', title: 'Dashboard' },
    { path: '/admin/users', title: 'Users' },
    { path: '/admin/roles', title: 'Roles' },
    { path: '/admin/permissions', title: 'Permissions' },
    { path: '/admin/roles-permissions', title: 'Roles Permissions' },
    { path: '/admin/users-roles', title: 'Users Roles' },
    { path: '/admin/roles-permissions', title: 'Roles Permissions' },
    { path: '/admin/users-roles', title: 'Users Roles' },
  ];

  userRoutes = [
    { path: '/user/dashboard', title: 'Dashboard' },
    { path: '/user/profile', title: 'Profile' },
    { path: '/user/settings', title: 'Settings' },
  ];


  constructor() {}

  ngOnInit() {
  }

}
