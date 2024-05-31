import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  event = {
    id: 1,
    name: 'Event Name',
    description: 'Event Description',
    location: 'Event Location'
  }

  constructor(private router: Router) { }

  showDetails(): void {
    this.router.navigate(['/events/' + this.event.id]);
  }
}
