import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: "Sodium", weight: 22.9897, symbol: "Na"},
  {position: 12, name: "Magnesium", weight: 24.305, symbol: "Mg"},
  {position: 13, name: "Aluminum", weight: 26.9815, symbol: "Al"},
  {position: 14, name: "Silicon", weight: 28.0855, symbol: "Si"},
  {position: 15, name: "Phosphorus", weight: 30.9738, symbol: "P"},
  {position: 16, name: "Sulfur", weight: 32.065, symbol: "S"},
  {position: 17, name: "Chlorine", weight: 35.453, symbol: "Cl"},
  {position: 18, name: "Argon", weight: 39.948, symbol: "Ar"},
  {position: 19, name: "Potassium", weight: 39.0983, symbol: "K"},
  {position: 20, name: "Calcium", weight: 40.078, symbol: "Ca"}
];



@Component({
  selector: 'app-learn-table',
  templateUrl: './learn-table.component.html',
  styleUrl: './learn-table.component.css'
})
export class LearnTableComponent implements OnInit {


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['symbol', 'position', 'name', 'weight'];
  displayedColumnsData: string[] = ['symbol', 'position', 'name'];

  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator


  // ! following was used becuase this.dataSource.sort and this.dataSource.paginator was not initialized
  // ! but then i used setTimeout to resolve the issue
  // @ViewChild(MatSort) set matSort(sort: MatSort) {
  //   if (!this.dataSource.sort) {
  //       this.dataSource.sort = sort;
  //   }
  // }

  // @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
  //   if (!this.dataSource.paginator) {
  //       this.dataSource.paginator = paginator;
  //   }
  // }


  ngOnInit(): void {
    // this.dataSource.sort = this.sort
    // this.dataSource.paginator = this.paginator

    // setTimeout(() => {
    //   this.dataSource.sort = this.sort
    //   this.dataSource.paginator = this.paginator
    // });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  logData(data: any) {
    console.log(data)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

