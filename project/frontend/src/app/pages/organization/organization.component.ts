import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AllOrgRequest, Organization } from '../../models/User';
import { Role } from '../../enums/role';
import { OrganizationService } from '../../services/organization/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {

  // organizations: Organization[] = [
  //   {
  //     id: '1',
  //     name: 'Organization 1',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 1',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '2',
  //     name: 'Organization 2',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 2',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '3',
  //     name: 'Organization 3',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 3',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '4',
  //     name: 'Organization 4',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 4',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '5',
  //     name: 'Organization 5',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 5',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '6',
  //     name: 'Organization 6',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 6',
  //     followers: []
  //   } as Organization,
  //   {
  //     id: '7',
  //     name: 'Organization 7',
  //     email: "",
  //     // role: Role,
  //     averageRating: 4.5,
  //     totalEvents: 10,
  //     avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     bio: 'This is the bio of organization 7',
  //     followers: []
  //   } as Organization,
  // ]
  organizations: Organization[] = []
  searchValue: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

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


  constructor(private organizationService:OrganizationService) {}

  ngOnInit() {

    let allOrgReq = new AllOrgRequest();

    allOrgReq.search = this.searchValue;
    allOrgReq.page = this.pageIndex // ? this.pageIndex : 1;
    allOrgReq.limit = this.pageSize // ? this.pageSize : 5;

    this.organizationService.getOrganizations(allOrgReq).subscribe(data => {
      console.log(data.data.organizations)
      this.organizations = data.data.organizations;
      this.length = data.data.total;
    })

    // this.eventService.getEvents(this.getQueryParams()).subscribe(data => {
    //   console.log(data)
    //   this.events = data.data.events;
    // })
  }


  search(){
    let allOrgReq = new AllOrgRequest();

    allOrgReq.search = this.searchValue;
    allOrgReq.page = this.pageIndex // ? this.pageIndex : 1;
    allOrgReq.limit = this.pageSize // ? this.pageSize : 5;

    this.organizationService.getOrganizations(allOrgReq).subscribe(data => {
      console.log(data.data.organizations)
      this.organizations = data.data.organizations;
    })
  }


  public handlePageChange(event: any): void {
    console.log(event)
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.search();
    // this.fetchItems(this.pageIndex, this.pageSize);
  }

}
