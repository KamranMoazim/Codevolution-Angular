import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {

  dateRange: FormGroup;
  minPrice: number = 1;
  maxPrice: number = 2000;
  selectedStatus: string;
  startTime: string;
  endTime: string;
  times: string[];
  endTimes: string[];

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.dateRange = this.fb.group({
      // start: [data.start],
      // end: [data.end],
      start: [null],
      end: [null],
    });
    // this.selectedStatus = data.selectedStatus;
    this.selectedStatus = "";
    this.times = this.generateTimes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {

    const formattedStartDate = this.formatDate(this.dateRange.value.start);
    const formattedEndDate = this.formatDate(this.dateRange.value.end);
    // const formattedDateRange = { start: formattedStartDate, end: formattedEndDate };

    const filters = {
      selectedStatus: this.selectedStatus,
      // dateRange: this.dateRange.value,
      // dateRange: formattedDateRange,
      // startDate:formattedStartDate,
      // endDate:formattedEndDate,
      startDate:formattedStartDate ? this.convertDate(formattedStartDate) : formattedStartDate,
      endDate:formattedEndDate ? this.convertDate(formattedEndDate) : formattedEndDate,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      // startTime: this.startTime,
      // endTime: this.endTime
      startTime: this.startTime ? this.timeToMinutes(this.startTime) : this.startTime,
      endTime: this.endTime ? this.timeToMinutes(this.endTime) : this.endTime
    };
    this.dialogRef.close(filters);
  }


  generateTimes(): string[] {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        const hour = i % 12 || 12;
        const minute = j < 10 ? `0${j}` : j;
        const period = i < 12 ? 'AM' : 'PM';
        times.push(`${hour}:${minute} ${period}`);
      }
    }
    return times;
  }


  formatDate(date: Date): string {
    let k = this.datePipe.transform(date, 'dd/MM/yyyy');
    console.log(k)
    return k
  }


  convertDate(dateStr) {
    // Split the input date string to get day, month, and year
    let [day, month, year] = dateStr.split('/').map(Number);

    // Create a new Date object
    let date = new Date(year, month - 1, day);

    // Ensure two digits for month and day
    month = (month < 10 ? '0' : '') + month;
    day = (day < 10 ? '0' : '') + day;

    // Format the date to 'YYYY-MM-DDThh:mm:ss.zzzZ'
    let formattedDate = date.toISOString();

    return formattedDate;
  }

  timeToMinutes(timeStr) {
    // Split the time string into its components
    let [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    // Convert 12 AM and 12 PM to 0 and 12 respectively
    if (period === 'AM' && hours === 12) {
        hours = 0;
    } else if (period === 'PM' && hours !== 12) {
        hours += 12;
    }

    // Calculate the total number of minutes past midnight
    let totalMinutes = (hours * 60) + minutes;

    return totalMinutes;
}


  generateEndTimes(startTime) {
    const startMinutes = this.timeToMinutes(startTime);

    return this.times.filter(time => this.timeToMinutes(time) > startMinutes);
  }


  onStartTimeChange(){
    this.endTimes = this.generateEndTimes(this.startTime);
  }




}
