import { Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrl: './generic-pagination.component.css'
})
export class GenericPaginationComponent {

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

  @Input() items: any[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize = 10;
  @Input() showFirstLastButtons = true;
  @Input() template: TemplateRef<any>;

  paginatedItems: any[] = [];
  length: number;
  pageIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.length = this.items.length;
      this.paginateItems();
    }
  }

  handlePageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateItems();
  }

  private paginateItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.items.slice(startIndex, endIndex);

  }

}
