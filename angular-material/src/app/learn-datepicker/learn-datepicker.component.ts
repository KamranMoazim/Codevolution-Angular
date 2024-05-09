import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-datepicker',
  templateUrl: './learn-datepicker.component.html',
  styleUrl: './learn-datepicker.component.css'
})
export class LearnDatepickerComponent {

  minDate = new Date()
  maxDate = new Date(2024, 4, 15);

  dateFilter = date => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

}
