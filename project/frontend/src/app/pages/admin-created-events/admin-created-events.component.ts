import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-created-events',
  templateUrl: './admin-created-events.component.html',
  styleUrl: './admin-created-events.component.css'
})
export class AdminCreatedEventsComponent {

  constructor(private router: Router) {}

  createEvent() {
    const eventId = 'new'; // or generate a new ID if needed
    this.router.navigate([`/admin/events/${eventId}`]);
  }


}
