import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { EventService } from '../../services/event/event.service';
import { AllEventsRequest, Event } from '../../models/Event';
import { DatePipe } from '@angular/common';
import { User } from '../../models/User';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {


  public events: Event[] = []
  searchValue = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: PageEvent;


  selectedStatus: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  startTime: string = '';
  endTime: string = '';
  startDate: string = '';
  endDate: string = '';

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public eventService: EventService,

  ) {
  }

  ngOnInit(): void {
    this.eventService.getEvents(this.getQueryParams()).subscribe(data => {
      console.log(data)
      this.events = data.data.events;
      this.length = data.data.totalPages;
      this.pageIndex = data.data.page;
    })

    console.log("Kamran is here")
  }


  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: '100vw',
      data: { selectedStatus: '', start: null, end: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Filters applied:', this.dateRange.value);
        console.log('Result applied:', result);

        this.selectedStatus = result.selectedStatus;
        this.dateRange = result.dateRange;
        this.startDate = result.startDate;
        this.endDate = result.endDate;
        this.minPrice = result.minPrice;
        this.maxPrice = result.maxPrice;
        this.startTime = result.startTime;
        this.endTime = result.endTime;

      }
    });
  }


  search(): void {
    console.log('searchValue:', this.searchValue);
    console.log('pageEvent:', this.pageEvent);


    this.eventService.getEvents(this.getQueryParams()).subscribe(data => {
      console.log(data)
      this.events = data.data.events;
      this.length = data.data.totalPages;
      this.pageIndex = data.data.page;
    })
  }


  formatDate(date: Date): string {
    let k = this.datePipe.transform(date, 'dd/MM/yyyy');
    // console.log(k)
    return k
  }

  private getQueryParams(): AllEventsRequest {
    let allEventsRequest = new AllEventsRequest();

    if(this.searchValue) allEventsRequest.search = this.searchValue;

    allEventsRequest.page = this.pageIndex;
    allEventsRequest.limit = this.pageSize;

    if(this.minPrice) allEventsRequest.minPrice = this.minPrice;
    if(this.maxPrice) allEventsRequest.maxPrice = this.maxPrice;
    if(this.selectedStatus) allEventsRequest.status = this.selectedStatus;
    if(this.startDate) allEventsRequest.startDate = this.startDate;
    if(this.endDate) allEventsRequest.endDate = this.endDate;
    // if(this.startTime) allEventsRequest.startTime = this.startTime;
    // if(this.endTime) allEventsRequest.endTime = this.endTime;

    console.log(allEventsRequest)


    return allEventsRequest;
  }


  public handlePageChange(event: any): void {
    console.log(event)
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.search();
  }
}
