import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { Role } from '../../enums/role';
import { User } from '../../models/User';
import { CreateReviewRequest, Review } from '../../models/Review';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { EventService } from '../../services/event/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from '../../services/review/review.service';
import { TicketService } from '../../services/ticket/ticket.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {

  public ratingBarChart: any;
  public ticketsLineChart: any;
  // public uniqueUsersPieChart: any;


  showAnalytics = false;

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  fxLayout = "column";
  fxLayoutAlign = "start";

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


  event:Event = {}

  eventId: string = null;

  amAuthorizedAdmin: boolean = false;

  // currentLoggedInUser: User = {
  //   email: "testUser@gmail.com",
  //   role: Role.ADMIN,
  //   name: "Test User",
  // } as User

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private eventService: EventService,
    private reviewService: ReviewService,
    private ticketService: TicketService,
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }


    this.eventId = this.route.snapshot.paramMap.get('id');



    this.eventService.getEventDetails(this.eventId)
      .subscribe({
        next: response => {
          console.log(response);
          this.event = response.data.event;

          this.getEventReviews()

          // console.log(response.data.event.organizer.avatar);
        },
        error: error => {
          console.log(error);
          this.showSnackBar(error);
        }
      });

      this.isAuthorizedAdmin()
  }


  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to login page
    })
  }

  isAuthorizedAdmin() {
    // return this.currentLoggedInUser.role === Role.ADMIN;
    this.eventService.isThisMyEvent(this.eventId)
      .subscribe({
        next: response => {
          console.log(response);
          // response.data.isMyEvent;
          this.amAuthorizedAdmin = response.data.isMyEvent;
        },
        error: error => {
          console.log(error);
          // this.showSnackBar(error);

          this.amAuthorizedAdmin = false;
        }
      });
  }

  buyTicket(): void {
    // Implement buy ticket functionality
    // alert('Ticket purchased!');

    this.ticketService.buyTicket(this.eventId)
    .subscribe({
      next: response => {
        // console.log(response);
        this.showSnackBar(response.message);
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }

  editEvent(): void {
    // Implement edit event functionality
    // alert('Edit event clicked!');
    this.router.navigate(['/admin/events/', this.event._id]);
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

    const reviewData = new CreateReviewRequest()
    reviewData.comment = this.comments;
    reviewData.rating = this.rating;
    reviewData.eventId = this.eventId;

    this.reviewService.addReview(reviewData)
    .subscribe({
      next: response => {
        // console.log(response);
        this.showSnackBar(response.message);

        this.comments = '';
        this.rating = 1;

        this.getEventReviews()
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }


  getEventReviews() {
    this.reviewService.getAllReviews(this.eventId, this.pageIndex+1, this.pageSize)
    .subscribe({
      next: response => {
        // console.log(response);
        // this.showSnackBar(response.message);
        this.event.reviews = response.data.reviews;
        this.length = response.data.total;
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
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

  showAnalyticsSection() {
    this.showAnalytics = !this.showAnalytics;

    if (this.showAnalytics) {
      this.createRatingBarChart();
      this.createTicketsLineChart();
    }
  }





  createRatingBarChart(){

    // getEachStarCountAnalytics


    this.analyticsService.getEachStarCountAnalytics(this.eventId)
    .subscribe({
      next: response => {
        console.log(response);

        this.ratingBarChart = new Chart("RatingBarChart", {
          type: 'bar', //this denotes tha type of chart
          data:{
            // labels: ['*', '**', '***', '****', '*****'],
            labels: response.data.analysis.labels,
            datasets: [{
              label: 'Event Ratings',
              // data: [65, 40, 80, 81, 56],
              data: response.data.analysis.datasets,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            aspectRatio:1.5,
          }

        });

      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });



  }

  createTicketsLineChart(){

    this.analyticsService.getLast30DaysTicketBoughtAnalytics(this.eventId)
    .subscribe({
      next: response => {
        console.log(response);


        this.ticketsLineChart = new Chart("TicketsLineChart", {
          type: 'line', //this denotes tha type of chart
          data:{
            // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            labels: response.data.analysis.labels,
            datasets: [{
              label: 'Tickets Bought in Last 30 Days Before Event Date',
              // data: [65, 59, 80, 81, 56, 55],
              data: response.data.analysis.datasets,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            aspectRatio:1.5,
          }

        });

      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });


  }


  // createShiftsPieChart(){

  //   this.shiftsPieChart = new Chart("ShiftsPieChart", {
  //     type: 'pie', //this denotes tha type of chart
  //     data:{
  //       labels: ["Morning", "Afternoon", "Evening", "Night"],
  //       datasets: [{
  //         label: 'All Events Shifts',
  //         data: [300, 50, 100, 150],
  //         backgroundColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(54, 162, 235)',
  //           'rgb(255, 205, 86)',
  //           'rgb(75, 192, 192)'
  //         ],
  //         hoverOffset: 4
  //       }],
  //     },
  //     options: {
  //       aspectRatio:1.5,
  //     }

  //   });
  // }

  public handlePageChange(event: any): void {
    console.log(event)
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // this.search();
  }


}
