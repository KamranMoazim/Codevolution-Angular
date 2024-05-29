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
  minPrice: number;
  maxPrice: number;
  selectedStatus: string;
  startTime: string;
  endTime: string;
  times: string[];

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.dateRange = this.fb.group({
      start: [data.start],
      end: [data.end],
    });
    this.selectedStatus = data.selectedStatus;
    this.times = this.generateTimes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {

    const formattedStartDate = this.formatDate(this.dateRange.value.start);
    const formattedEndDate = this.formatDate(this.dateRange.value.end);
    const formattedDateRange = { start: formattedStartDate, end: formattedEndDate };

    const filters = {
      selectedStatus: this.selectedStatus,
      // dateRange: this.dateRange.value,
      // dateRange: formattedDateRange,
      startDate:formattedStartDate,
      endDate:formattedEndDate,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      startTime: this.startTime,
      endTime: this.endTime
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
}
