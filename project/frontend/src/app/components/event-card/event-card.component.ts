import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/Event';
import { TicketService } from '../../services/ticket/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @Input() isReturnAble:boolean = false

  constructor(
    private router: Router,
    private ticketServic:TicketService,
    private snackBar: MatSnackBar
  ) { }

  showDetails(): void {
    console.log(this.event)
    this.router.navigate(['/events/' + this.event._id]);
  }

  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to login page
    })
  }

  callReturnTicket(){
    this.ticketServic.returnTicket(this.event._id)
    .subscribe({
      next: response => {
        console.log(response)
        this.showSnackBar(response.message)
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error.message)
      }
    });
  }
}
