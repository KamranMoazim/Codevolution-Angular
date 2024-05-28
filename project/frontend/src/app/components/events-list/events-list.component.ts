import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent {

  // length = 50;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];

  // hidePageSize = false;
  // showPageSizeOptions = true;
  // showFirstLastButtons = true;
  // disabled = false;

  // pageEvent: PageEvent;

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  // }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  items = [
    { title: 'Item 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    { title: 'Item 2', subtitle: 'Subtitle 2', content: 'Content 2' },
    { title: 'Item 3', subtitle: 'Subtitle 3', content: 'Content 3' },
    // Add more items as needed
  ];


}
