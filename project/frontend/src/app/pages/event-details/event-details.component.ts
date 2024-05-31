import { Component } from '@angular/core';
import { Event } from '../../models/Event';
import { Role } from '../../enums/role';
import { User } from '../../models/User';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  event:Event = {
    id: "1",
    capacity: 100,
    date: new Date(),
    description: "Event Description",
    location: "Event Location",
    category: "Event Category",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    media: ["https://material.angular.io/assets/img/examples/shiba2.jpg"],
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

  constructor() { }


  isAdmin(): boolean {
    return this.currentLoggedInUser.role === Role.ADMIN;
  }

  buyTicket(): void {
    // Implement buy ticket functionality
    alert('Ticket purchased!');
  }

  editEvent(): void {
    // Implement edit event functionality
    alert('Edit event clicked!');
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
}
