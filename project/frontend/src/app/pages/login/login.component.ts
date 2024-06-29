import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/Auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('kamrannaseer765@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('Kamran12345', [Validators.required])
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(this.loginForm.value);

    var loginRequest = new LoginRequest(this.loginForm.value.email, this.loginForm.value.password);

    this._authService.loginUser(loginRequest)
    .subscribe({
      next: response => {
        console.log(response);
        this.showSnackBar(response.message);
        this.router.navigate(['/profile']);
      },
      error: error => {
        // console.log("error");
        // console.log(error);
        this.showSnackBar(error);
      }
    });
  }

  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to home page
      // this.router.navigate(['/home']);
    })


    // let snackBarRef = this.snackBar.open(message, action, {duration:2000})

    // snackBarRef.afterDismissed().subscribe(() => {
    //   console.log("snackBar was dismissed")
    // })

    // snackBarRef.onAction().subscribe(() => {
    //   console.log("snackBar action was triggered")
    // })
  }

  goToRegisterPage(){
    this.router.navigate(['/register']);
  }

}
