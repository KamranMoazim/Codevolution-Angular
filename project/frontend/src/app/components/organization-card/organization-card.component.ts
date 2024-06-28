import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../../models/User';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrl: './organization-card.component.css'
})
export class OrganizationCardComponent  {

  // @Input() event: Event;
  @Input() organization:Organization;

  constructor(private router: Router) { }


  showOrganizationDetails() {
    console.log('Organization details');
    console.log(this.organization);
    this.router.navigate(['/organizations/'+this.organization._id]);
  }

}
