import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  testimonials = [
    { text: 'This event was a game-changer for my business. Highly recommend!', author: 'John Doe', rating: 5, date: new Date('2023-06-15') },
    { text: 'An incredible experience from start to finish. Can\'t wait for the next one!', author: 'Jane Smith', rating: 4, date: new Date('2023-06-15') },
    { text: 'I learned so much and made some great connections. 10/10!', author: 'Alice Johnson', rating: 5, date: new Date('2023-06-15') },
    { text: 'This event was a game-changer for my business. Highly recommend!', author: 'John Doe', rating: 5, date: new Date('2023-06-15') },

    // Add more testimonials as needed
    { text: 'An incredible experience from start to finish. Can\'t wait for the next one!', author: 'Jane Smith', rating: 4, date: new Date('2023-06-15') },
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

}
