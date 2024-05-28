import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

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
  }

}
