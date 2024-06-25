import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { Role } from '../../enums/role';
import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {

  public chart: any;

  public topEvents: Event[] = [
    {
      id: "1",
      title: 'Event Name 1',
      description: 'Event Description 1',
      date: new Date(),
      startTime: '12:00',
      endTime: '14:00',
      location: 'Event Location 1',
      organizer: {
        id: "1",
        email: "",
        name: "Organizer Name",
        avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        bio: "",
      } as User,
      capacity: 100,
      category: 'culture',
      ticketPrice: 100,
      status: 'Upcoming',
      media: ['https://material.angular.io/assets/img/examples/shiba2.jpg'],
      // image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: "2",
      title: 'Event Name 2',
      description: 'Event Description 2',
      date: new Date(),
      startTime: '12:00',
      endTime: '14:00',
      location: 'Event Location 2',
      organizer: {
        id: "2",
        email: "",
        name: "Organizer Name",
        avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        bio: "",
      } as User,
      capacity: 100,
      category: 'culture',
      ticketPrice: 100,
      status: 'Upcoming',
      media: ['https://material.angular.io/assets/img/examples/shiba2.jpg'],
      // image: ''
    },
    {
      id: "3",
      title: 'Event Name 3',
      description: 'Event Description 3',
      date: new Date(),
      startTime: '12:00',
      endTime: '14:00',
      location: 'Event Location 3',
      organizer: {
        id: "3",
        email: "",
        name: "Organizer Name",
        avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        bio: "",
      } as User,
      capacity: 100,
      category: 'culture',
      ticketPrice: 100,
      status: 'Upcoming',
      media: ['https://material.angular.io/assets/img/examples/shiba2.jpg'],
      // image: ''
    },
    {
      id: "4",
      title: 'Event Name 4',
      description: 'Event Description 4',
      date: new Date(),
      startTime: '12:00',
      endTime: '14:00',
      location: 'Event Location 4',
      organizer: {
        id: "4",
        email: "",
        name: "Organizer Name",
        avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        bio: "",
      } as User,
      capacity: 100,
      category: 'culture',
      ticketPrice: 100,
      status: 'Upcoming',
      media: ['https://material.angular.io/assets/img/examples/shiba2.jpg'],
      // image: ''
    },
    {
      id: "5",
      title: 'Event Name 5',
      description: 'Event Description 5',
      date: new Date(),
      startTime: '12:00',
      endTime: '14:00',
      location: 'Event Location 5',
      organizer: {
        id: "5",
        email: "",
        name: "Organizer Name",
        avatar: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        bio: "",
      } as User,
      capacity: 100,
      category: 'culture',
      ticketPrice: 100,
      status: 'Upcoming',
      media: ['https://material.angular.io/assets/img/examples/shiba2.jpg'],
      // image: ''
    }
  ];


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
    this.createChart();
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






  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
