import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public ticketsLineChart: any;
  public allEventUniqueCategoriesPieChart: any;
  // public shiftsPieChart: any;
  public ratingBarChart: any;

  avgRating: any = [
    { _id: 'event1', averageRating: 4.5 },
    { _id: 'event2', averageRating: 3.8 },
    { _id: 'event3', averageRating: 4.2 }
  ];

  sentiment: any = [
    { _id: 'event1', positiveReviews: 10, neutralReviews: 5, negativeReviews: 2 },
    { _id: 'event2', positiveReviews: 7, neutralReviews: 3, negativeReviews: 6 },
    { _id: 'event3', positiveReviews: 15, neutralReviews: 4, negativeReviews: 1 }
  ];

  categories: any = [
    { _id: 'Music', totalEvents: 8 },
    { _id: 'Tech', totalEvents: 5 },
    { _id: 'Health', totalEvents: 12 }
  ];

  // totalRevenue = 32000; // Example hardcoded revenue

  generalAnalytics: {
    totalEvents: number,
    totalTickets: number,
    totalRevenue: number,
    totalReviews: number
  } = {
    totalEvents: 10,
    totalTickets: 100,
    totalRevenue: 32000,
    totalReviews: 20
  };

  constructor(
    private analyticsService: AnalyticsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.analyticsService.getAnalytics().subscribe(data => {
    //   this.avgRating = data.avgRating;
    //   this.sentiment = data.sentiment;
    //   this.categories = data.categories;
    // });

    this.createTicketsLineChart();
    this.createAllEventUniqueCategoriesPieChart();
    // this.createShiftsPieChart();
    this.createRatingBarChart()

    this.analyticsService.getTotalRevenueAnalytics()
    .subscribe({
      next: response => {
        console.log(response);

        // this.totalRevenue = response.data.totalRevenue;
        this.generalAnalytics = response.data;

        // console.log(response.data.event.organizer.avatar);
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }




  createTicketsLineChart(){

    this.analyticsService.getLast12MonthsEventCreationCountAnalytics()
    .subscribe({
      next: response => {
        console.log(response);

        this.ticketsLineChart = new Chart("TicketsLineChart", {
          type: 'line', //this denotes tha type of chart
          data:{
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            labels: response.data.analysis.labels,
            datasets: [{
              label: 'Number of Events created in Last 12 Months',
              // data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
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

        // console.log(response.data.event.organizer.avatar);
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });


  }


  createAllEventUniqueCategoriesPieChart(){

    this.analyticsService.getUniqueCategoriesWithEventCountAnalytics()
    .subscribe({
      next: response => {
        console.log(response);

        this.allEventUniqueCategoriesPieChart = new Chart("AllEventUniqueCategoriesPieChart", {
          type: 'pie', //this denotes tha type of chart
          data:{
            // labels: [
            //   'Red',
            //   'Blue',
            //   'Yellow'
            // ],
            labels: response.data.analysis.labels,
            datasets: [{
              label: 'Number of Events in each Category',
              // data: [300, 50, 100],
              data: response.data.analysis.datasets,
              backgroundColor: [
                ...response.data.analysis.labels.map(() => {
                  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
                })
              ],
              hoverOffset: 4
            }],
          },
          options: {
            aspectRatio:1.5,
          }

        });

        // console.log(response.data.event.organizer.avatar);
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }



  createRatingBarChart(){

    // getEachStarCountAnalytics


    this.analyticsService.getEachStarCountForAllEventsAnalytics()
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


  // createShiftsPieChart(){

    // this.analyticsService.getAllEventsTimeOfTheDayAnalytics()
    // .subscribe({
    //   next: response => {
    //     console.log(response);

        // this.shiftsPieChart = new Chart("ShiftsPieChart", {
        //   type: 'pie', //this denotes tha type of chart
        //   data:{
        //     labels: response.data.analysis.labels,
        //     datasets: [{
        //       label: 'All Events Shifts',
        //       data: response.data.analysis.datasets,
        //       backgroundColor: [
        //         'rgb(255, 99, 132)',
        //         'rgb(54, 162, 235)',
        //         'rgb(255, 205, 86)',
        //         'rgb(75, 192, 192)'
        //       ],
        //       hoverOffset: 4
        //     }],
        //   },
        //   options: {
        //     aspectRatio:1.5,
        //   }

        // });

        // console.log(response.data.event.organizer.avatar);
    //   },
    //   error: error => {
    //     console.log(error);
    //     this.showSnackBar(error);
    //   }
    // });

    // this.shiftsPieChart = new Chart("ShiftsPieChart", {
    //   type: 'pie', //this denotes tha type of chart
    //   data:{
    //     labels: ["Morning", "Afternoon", "Evening", "Night"],
    //     datasets: [{
    //       label: 'All Events Shifts',
    //       data: [300, 50, 100, 150],
    //       backgroundColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(54, 162, 235)',
    //         'rgb(255, 205, 86)',
    //         'rgb(75, 192, 192)'
    //       ],
    //       hoverOffset: 4
    //     }],
    //   },
    //   options: {
    //     aspectRatio:1.5,
    //   }

    // });
  // }



  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to login page
    })
  }

}
