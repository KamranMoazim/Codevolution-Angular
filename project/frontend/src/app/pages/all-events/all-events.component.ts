import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { EventService } from '../../services/event/event.service';
import { AllEventsRequest, Event } from '../../models/Event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {

  public events: Event[] = [];

  searchValue = '';

  length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(e)
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }




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


  // selectedStatus: this.selectedStatus,
  // dateRange: this.dateRange.value,
  // minPrice: this.minPrice,
  // maxPrice: this.maxPrice,
  // startTime: this.startTime,
  // endTime: this.endTime


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public eventService: EventService,

  ) {
    // this.dateRange = this.fb.group({
    //   start: [null],
    //   end: [null]
    // });
  }

  ngOnInit(): void {
    this.eventService.getEvents(this.getQueryParams()).subscribe(data => {
      console.log(data)
      this.events = data.data.events;
    })
  }


  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: '100vw',
      data: { selectedStatus: '', start: null, end: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Filters applied:', this.dateRange.value);
        // console.log("searchValue:", this.searchValue);
        // console.log("pageEvent:", this.pageEvent);

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
    // console.log(this.pageEvent);

    // let allEventsRequest = new AllEventsRequest(
    //   this.searchValue ? this.searchValue : undefined,
    //   this.pageEvent ? this.pageEvent.pageIndex : 1,
    //   this.pageEvent ? this.pageEvent?.pageSize : 5,
    //   "date",
    //   "asc",
    //   this.minPrice ? this.minPrice : undefined,
    //   this.maxPrice ? this.maxPrice : undefined,
    //   this.selectedStatus ? this.selectedStatus : undefined,
    //   this.startDate ? this.startDate : undefined,
    //   this.endDate ? this.endDate : undefined,
    //   this.startTime ? this.startTime : undefined,
    //   this.endTime ? this.endTime : undefined,
    //   0,
    //   5
    // )



    this.eventService.getEvents(this.getQueryParams()).subscribe(data => {
      // console.log(data)
    })
  }


  formatDate(date: Date): string {
    let k = this.datePipe.transform(date, 'dd/MM/yyyy');
    console.log(k)
    return k
  }

  private getQueryParams(): AllEventsRequest {
    let allEventsRequest = new AllEventsRequest();

    if(this.searchValue) allEventsRequest.search = this.searchValue;
    if(this.pageEvent) {
      allEventsRequest.page = this.pageEvent.pageIndex;
    } else {
      allEventsRequest.page = 1;
      console.log("page:", allEventsRequest.page)
    }
    if(this.pageEvent) {
      allEventsRequest.limit = this.pageEvent.pageSize;
    } else {
      allEventsRequest.limit = 5;
      console.log("limit:", allEventsRequest.limit)
    }
    if(this.minPrice) allEventsRequest.minPrice = this.minPrice;
    if(this.maxPrice) allEventsRequest.maxPrice = this.maxPrice;
    if(this.selectedStatus) allEventsRequest.status = this.selectedStatus;
    if(this.startDate) allEventsRequest.startDate = this.startDate;
    if(this.endDate) allEventsRequest.endDate = this.endDate;
    if(this.startTime) allEventsRequest.startTime = this.startTime;
    if(this.endTime) allEventsRequest.endTime = this.endTime;

    console.log(allEventsRequest)


    return allEventsRequest;
  }
}
