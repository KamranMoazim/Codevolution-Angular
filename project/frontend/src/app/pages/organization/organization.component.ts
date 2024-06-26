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

  organizations: Organization[] = []
  searchValue: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(private organizationService:OrganizationService) {}

  ngOnInit() {

    let allOrgReq = new AllOrgRequest();

    allOrgReq.search = this.searchValue;
    allOrgReq.page = this.pageIndex
    allOrgReq.limit = this.pageSize

    this.organizationService.getOrganizations(allOrgReq).subscribe(data => {
      console.log(data.data.organizations)
      this.organizations = data.data.organizations;
      this.length = data.data.total;
    })

  }


  search(){
    let allOrgReq = new AllOrgRequest();

    allOrgReq.search = this.searchValue;
    allOrgReq.page = this.pageIndex
    allOrgReq.limit = this.pageSize

    this.organizationService.getOrganizations(allOrgReq).subscribe(data => {
      console.log(data.data.organizations)
      this.organizations = data.data.organizations;
      this.length = data.data.total;
    })
  }


  public handlePageChange(event: any): void {
    console.log(event)
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.search();
  }

}
