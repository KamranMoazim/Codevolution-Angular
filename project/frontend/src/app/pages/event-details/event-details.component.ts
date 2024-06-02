import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { Role } from '../../enums/role';
import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {


  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  event:Event = {
    id: "1",
    capacity: 100,
    date: new Date(),
    description: "Event Description",
    location: "Event Location",
    category: "Event Category",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    media: [
      "https://material.angular.io/assets/img/examples/shiba1.jpg",
      "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "https://material.angular.io/assets/img/examples/shiba1.jpg",
      "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "https://material.angular.io/assets/img/examples/shiba1.jpg",
    ],
    organizer: {
      email: "test@gmail.com",
      name: "Test Organizer",
      role: Role.ADMIN
    } as User,
    reviews: [
      {
        _id: "1",
        rating: 5,
        comment: "Great Event",
        user: {
          email: "first@gmail.com",
          name: "First User",
          avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg"
        } as User
      } as Review,
      {
        _id: "2",
        rating: 3.5,
        comment: "Great Event",
        user: {
          email: "first@gmail.com",
          name: "First User",
          avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg"
        } as User
      } as Review
    ],
    status: "active",
    ticketPrice: 10,
    title: "Event Title"
  }

  currentLoggedInUser: User = {
    email: "testUser@gmail.com",
    role: Role.ADMIN,
    name: "Test User",
  } as User

  constructor(
    private router:Router,
  ) { }


  isAdmin(): boolean {
    return this.currentLoggedInUser.role === Role.ADMIN;
  }

  buyTicket(): void {
    // Implement buy ticket functionality
    alert('Ticket purchased!');
  }

  editEvent(): void {
    // Implement edit event functionality
    // alert('Edit event clicked!');
    this.router.navigate(['/admin/events/', this.event.id]);
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStar).fill('star_half'),
      ...Array(5 - fullStars - halfStar).fill('star_border')
    ];
  }


  starRatings = [
    { value: 1, icon: 'star' },
    { value: 2, icon: 'star' },
    { value: 3, icon: 'star' },
    { value: 4, icon: 'star' },
    { value: 5, icon: 'star' }
  ];

  ratingArr = [];
  comments: string;
  starCount: number = 5;
  rating: number = 3;

  submitReview() {
    console.log('Rating:', this.rating);
    console.log('Comments:', this.comments);
    // Here you can send the review and comments to your backend or do any other processing.
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.rating = rating;
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
