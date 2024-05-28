import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {



  items: any[] = [
    { title: 'Item 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    { title: 'Item 2', subtitle: 'Subtitle 2', content: 'Content 2' },
    { title: 'Item 3', subtitle: 'Subtitle 3', content: 'Content 3' },
    { title: 'Item 4', subtitle: 'Subtitle 4', content: 'Content 4' },
    { title: 'Item 5', subtitle: 'Subtitle 5', content: 'Content 5' },
  ];
  loading: boolean = true;
  length: number = 100;
  pageSize: number = 5;
  pageIndex: number = 0;


  constructor() {}

  ngOnInit(): void {
    // this.fetchItems(this.pageIndex, this.pageSize);
  }

  fetchItems(pageIndex: number, pageSize: number): void {
    // this.loading = true;
    // this.dataService.fetchItems(pageIndex, pageSize).subscribe(
    //   response => {
    //     this.items = response.items; // Assuming the response has a field 'items'
    //     this.length = response.totalCount; // Assuming the response has a field 'totalCount'
    //     this.paginateItems();
    //     this.loading = false;
    //   },
    //   error => {
    //     console.error('Error fetching items', error);
    //     this.loading = false;
    //   }
    // );

    // this.items = [
    //   { title: 'Item 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    //   { title: 'Item 2', subtitle: 'Subtitle 2', content: 'Content 2' },
    //   { title: 'Item 3', subtitle: 'Subtitle 3', content: 'Content 3' },
    //   { title: 'Item 4', subtitle: 'Subtitle 4', content: 'Content 4' },
    //   { title: 'Item 5', subtitle: 'Subtitle 5', content: 'Content 5' },
    //   { title: 'Item 6', subtitle: 'Subtitle 6', content: 'Content 6' },
    //   { title: 'Item 7', subtitle: 'Subtitle 7', content: 'Content 7' },
    //   { title: 'Item 8', subtitle: 'Subtitle 8', content: 'Content 8' },
    //   { title: 'Item 9', subtitle: 'Subtitle 9', content: 'Content 9' },
    //   { title: 'Item 10', subtitle: 'Subtitle 10', content: 'Content 10' },
    //   { title: 'Item 11', subtitle: 'Subtitle 11', content: 'Content 11' },
    //   { title: 'Item 12', subtitle: 'Subtitle 12', content: 'Content 12' },
    //   { title: 'Item 13', subtitle: 'Subtitle 13', content: 'Content 13' },
    //   { title: 'Item 14', subtitle: 'Subtitle 14', content: 'Content 14' },
    //   { title: 'Item 15', subtitle: 'Subtitle 15', content: 'Content 15' },
    //   { title: 'Item 16', subtitle: 'Subtitle 16', content: 'Content 16' },
    //   { title: 'Item 17', subtitle: 'Subtitle 17', content: 'Content 17' },
    //   { title: 'Item 18', subtitle: 'Subtitle 18', content: 'Content 18' },
    //   { title: 'Item 19', subtitle: 'Subtitle 19', content: 'Content 19' },
    //   { title: 'Item 20', subtitle: 'Subtitle 20', content: 'Content 20' },
    //   { title: 'Item 21', subtitle: 'Subtitle 21', content: 'Content 21' },
    //   { title: 'Item 22', subtitle: 'Subtitle 22', content: 'Content 22' },
    //   { title: 'Item 23', subtitle: 'Subtitle 23', content: 'Content 23' },
    //   { title: 'Item 24', subtitle: 'Subtitle 24', content: 'Content 24' },
    // ];

    console.log("fetchItems")
      // this.paginatedItems = [];
      // for (let i = pageIndex * pageSize; i < (pageIndex+1) * (pageSize); i++) {
      //   console.log(i)
      //   this.paginatedItems.push({
      //     title: `Item ${i + 1}`,
      //     subtitle: `Subtitle ${i + 1}`,
      //     content: `Content ${i + 1}`,
      //   });
      // }
      // setTimeout(() => {
      //   this.paginateItems();
      //   console.log("fetchedItems")
      // }, 2000);

        this.items = [
      { title: 'Item 6', subtitle: 'Subtitle 6', content: 'Content 6' },
      { title: 'Item 7', subtitle: 'Subtitle 7', content: 'Content 7' },
      { title: 'Item 8', subtitle: 'Subtitle 8', content: 'Content 8' },
      { title: 'Item 9', subtitle: 'Subtitle 9', content: 'Content 9' },
      { title: 'Item 10', subtitle: 'Subtitle 10', content: 'Content 10' },
    ];
  }

  handlePageChange(event: any): void {
    console.log(event)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchItems(this.pageIndex, this.pageSize);
  }

  private paginateItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.items = this.items.slice(startIndex, endIndex);
  }


}
