import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AllEventsRequest } from '../../models/Event';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrl: './organization-detail.component.css'
})
export class OrganizationDetailComponent {

}
