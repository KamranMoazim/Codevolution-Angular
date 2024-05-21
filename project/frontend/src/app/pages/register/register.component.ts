import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterRequest } from '../../models/Auth';
import { PasswordValidator } from '../../shared/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm:FormGroup = new FormGroup({});

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) { }

  // registerForm = new FormGroup({
  //   name: new FormControl('kamran', [Validators.required]),
  //   email: new FormControl('kamrannaseer765@gmail.com', [Validators.required, Validators.email]),
  //   password: new FormControl('Kamran12345', [Validators.required]),
  //   confirmPassword: new FormControl('Kamran12345', [Validators.required]),
  //   role: new FormControl('user', [Validators.required])
  // },{
  //   validators: [PasswordValidator]
  // });

  ngOnInit() {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['user', [Validators.required]]
    }, { validator: PasswordValidator });

  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    console.log(this.registerForm.value);

    var registerRequest = new RegisterRequest(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.role);

    this._authService.resgisterUser(registerRequest)
      .subscribe({
        next: response => {
          console.log(response);
          this.showSnackBar(response.message);
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
      // take user to login page
      this.router.navigate(['/login']);
    })
  }

}
