import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrl: './organization-card.component.css'
})
export class OrganizationCardComponent {

  organization = {
    id: 1,
    name: 'Organization Name',
    description: 'Organization Description',
    location: 'Organization Location'
  }

  constructor(private router: Router) { }


  showOrganizationDetails() {
    console.log('Organization details');
    this.router.navigate(['/organizations/'+this.organization.id]);
  }

}
