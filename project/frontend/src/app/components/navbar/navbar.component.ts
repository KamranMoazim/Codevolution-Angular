import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userRole = 0;

  adminRoutes = [
    { path: '/admin/dashboard', title: 'Dashboard' },
    { path: '/admin/events', title: 'Events' },
  ];

  userRoutes = [
    { path: '/user/dashboard', title: 'Dashboard' },
    { path: '/user/profile', title: 'Profile' },
  ];

  openRoutes = [
    { path: '/login', title: 'Login' },
    { path: '/register', title: 'Register' },
  ];


  constructor(private _authServer:AuthService) {}

  ngOnInit() {
    this.userRole = this._authServer.getUserRole();
  }

  logout() {
    this._authServer.logoutUser();
    this.userRole = this._authServer.getUserRole();
  }

  // getUserRole(){
  //   let k = this._authServer.getUserRole()
  //   console.log(k)
  //   return k
  // }

}
