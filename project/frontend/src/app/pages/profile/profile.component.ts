import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Role } from '../../enums/role';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: User = {
    // id: "1",
    name: 'John Doe',
    email: "john@gmail.com",
    role: Role.USER,
    avatar: "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    // followers: [],
  } as User;


  profileForm: FormGroup;
  images: { file?: File, preview?: string, url?: string }[] = [];

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    // const userId = this.route.snapshot.paramMap.get('id');
    this.loadProfile()
    this.initForm();
  }

  // onSubmit(){}

  initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name],
      bio: [this.user.bio],
      // email: [{value: this.user.email, disabled: true}],
      email: [this.user.email],
      // role: [{value:this.user.role == Role.USER ? "User" : "Organizer", disabled: true}],
      role: [this.user.role == Role.USER ? "User" : "Organizer"],
    });

    this.profileForm.get('email')?.disable();
    this.profileForm.get('role')?.disable();
  }

  loadProfile(): void {
    this.userService.getMyProfile()
    .subscribe({
      next: response => {
        // console.log(response);
        this.user = response.data.profile;
        this.images = [{url: this.user.avatar}];
        // console.log(this.user);
        if(response.data.profile.role == "user"){
          this.user.role = Role.USER;
        } else {
          this.user.role = Role.ADMIN;
        }
        this.initForm();
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }

  onImagesChange(images: { file?: File, preview?: string, url?: string }[]) {
    this.images = images;
    // this.saveImageUrls();
  }

  saveProfile(): void {
    // Handle form submission
    console.log(this.profileForm.value); // You can send this data to the backend to update the user profile
    console.log(this.images); // You can send this data to the backend to update the user profile

    this.userService.updateProfile({
      name: this.profileForm.value.name,
      bio: this.profileForm.value.bio,
      avatar: this.images[0].url,
    })
    .subscribe({
      next: response => {
        console.log(response);
        this.showSnackBar(response.message);
        this.loadProfile()
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }

  cancelEdit(): void {
    // Handle cancel button click
    // You may want to reset the form or perform other actions here
  }

  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to login page
    })
  }

}
