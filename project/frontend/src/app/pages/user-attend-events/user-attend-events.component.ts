import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-attend-events',
  templateUrl: './user-attend-events.component.html',
  styleUrl: './user-attend-events.component.css'
})
export class UserAttendEventsComponent implements OnInit {

  user: User = {
    name: 'John Doe',
    email: "",
    role: "",
    avatar: "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    bio: "",
  } as User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getMyProfile()
    .subscribe({
      next: response => {
        this.user = response.data.profile;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
