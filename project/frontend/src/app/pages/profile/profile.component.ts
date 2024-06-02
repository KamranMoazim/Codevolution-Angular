import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Role } from '../../enums/role';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: User = {
    id: "1",
    name: 'John Doe',
    email: "john@gmail.com",
    role: Role.USER,
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    followers: [],
  } as User;


  profileForm: FormGroup;

  constructor(private route: ActivatedRoute,
    // private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // const userId = this.route.snapshot.paramMap.get('id');
    // this.userService.getUserProfile(userId).subscribe(
    //   data => {
    //     this.user = data;
    //     this.initForm();
    //   },
    //   error => {
    //     console.error('Error fetching user profile', error);
    //   }
    // );
    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name],
      bio: [this.user.bio],
      email: [this.user.email],
      role: [this.user.role],
      followers: [this.user.followers.length],
      // tickets: [this.user.tickets.length]
    });
  }

  saveProfile(): void {
    // Handle form submission
    console.log(this.profileForm.value); // You can send this data to the backend to update the user profile
  }

  cancelEdit(): void {
    // Handle cancel button click
    // You may want to reset the form or perform other actions here
  }

}
