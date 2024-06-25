import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public ticketsLineChart: any;
  public allEventUniqueCategoriesPieChart: any;
  public shiftsPieChart: any;

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

  totalRevenue = 32000; // Example hardcoded revenue

  // constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    // this.analyticsService.getAnalytics().subscribe(data => {
    //   this.avgRating = data.avgRating;
    //   this.sentiment = data.sentiment;
    //   this.categories = data.categories;
    // });

    this.createTicketsLineChart();
    this.createAllEventUniqueCategoriesPieChart();
    this.createShiftsPieChart();
  }




  createTicketsLineChart(){

    this.ticketsLineChart = new Chart("TicketsLineChart", {
      type: 'line', //this denotes tha type of chart
      data:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Number of Events created in Last 12 Months',
          data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        aspectRatio:1.5,
      }

    });
  }


  createAllEventUniqueCategoriesPieChart(){

    this.allEventUniqueCategoriesPieChart = new Chart("AllEventUniqueCategoriesPieChart", {
      type: 'pie', //this denotes tha type of chart
      data:{
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio:1.5,
      }

    });
  }



  createShiftsPieChart(){

    this.shiftsPieChart = new Chart("ShiftsPieChart", {
      type: 'pie', //this denotes tha type of chart
      data:{
        labels: ["Morning", "Afternoon", "Evening", "Night"],
        datasets: [{
          label: 'All Events Shifts',
          data: [300, 50, 100, 150],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio:1.5,
      }

    });
  }




}
