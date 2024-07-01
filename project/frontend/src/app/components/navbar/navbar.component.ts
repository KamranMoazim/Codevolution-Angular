import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private userSubscription: Subscription;
  loggedInUser: string;

  userRole = 0;

  // adminRoutes = [
  //   { path: '/admin/dashboard', title: 'Dashboard' },
  //   { path: '/admin/events', title: 'Events' },
  // ];

  // userRoutes = [
  //   { path: '/user/dashboard', title: 'Dashboard' },
  //   { path: '/user/profile', title: 'Profile' },
  // ];

  // openRoutes = [
  //   { path: '/login', title: 'Login' },
  //   { path: '/register', title: 'Register' },
  // ];


  // constructor(private userService: UserService) {

  // }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.userSubscription.unsubscribe();
  }

  refreshNavbar() {
    // Implement any logic to refresh navbar based on user state
    console.log('Navbar refreshed with user:', this.loggedInUser);
    this.userRole = this._authServer.getUserRole();
  }


  constructor(private _authServer:AuthService) {
        // Subscribe to user changes
        this.userSubscription = this._authServer.loggedInUser$.subscribe(user => {
          this.loggedInUser = user;
          // Refresh any data in navbar that depends on the user state
          this.refreshNavbar();
        });
  }

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
