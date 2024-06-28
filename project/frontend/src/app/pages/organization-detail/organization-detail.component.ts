import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AllEventsRequest } from '../../models/Event';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/User';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrl: './organization-detail.component.css'
})
export class OrganizationDetailComponent implements OnInit {

  organizationId: string = null;
  organization: User = {
    name: '',
  } as User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.loadProfile();
  }


  loadProfile(): void {
    this.userService.getUserProfile(this.organizationId)
    .subscribe({
      next: response => {
        console.log(response);
        this.organization = response.data.profile;
      },
      error: error => {
        console.log(error);
        this.showSnackBar(error);
      }
    });
  }

  showSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // take user to login page
    })
  }
}
