import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  // event:Event = {
  //   id: "1",
  //   title: 'Event Name',
  //   description: 'Event Description',
  //   location: 'Event Location'
  // }

  @Input() event: Event; // This is the input property

  constructor(private router: Router) { }

  showDetails(): void {
    console.log(this.event)
    this.router.navigate(['/events/' + this.event._id]);
  }
}
