import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrl: './generic-pagination.component.css'
})
export class GenericPaginationComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageIndex = 0;
  @Input() pageSize = 5;
  @Input() length = 10;
  @Input() showFirstLastButtons = true;
  @Input() template: TemplateRef<any>;

  @Input() fxLayout = "row wrap";
  @Input() fxLayoutAlign = "space-around center";


  @Output() pageChange = new EventEmitter<any>(); // Add this line

  // paginatedItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.paginateItems();
  }

  handlePageEvent(event: any): void {
    console.log('event emitting ', event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // this.paginateItems();
    this.pageChange.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize }); // Emit pagination information
  }

}
