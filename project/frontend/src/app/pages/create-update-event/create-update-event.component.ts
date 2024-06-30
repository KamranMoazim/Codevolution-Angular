import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AWS from 'aws-sdk';
import { EventService } from '../../services/event/event.service';
import { CreateOrUpdateEventRequest } from '../../models/Event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-update-event',
  templateUrl: './create-update-event.component.html',
  styleUrl: './create-update-event.component.css'
})
export class CreateUpdateEventComponent {

  eventForm: FormGroup;
  statusOptions = ['upcoming', 'ongoing', 'past'];
  amAuthorizedAdmin: boolean = false;

  isEditMode = false;
  eventId: string = null;

  images: { file?: File, preview?: string, url?: string }[] = [];
  s3: AWS.S3;
  // localImageUrls: string[] = []; // Store the uploaded image URLs locally


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private eventService:EventService,
    private snackBar: MatSnackBar,
  ) {
    // AWS.config.update({
    //   accessKeyId: 'AKIA3FLD6J5JOC55LSVW',
    //   secretAccessKey: '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',
    //   region: 'us-east-1'
    // });
    // this.s3 = new AWS.S3();
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(20)]],
      category: ['', Validators.required],
      ticketPrice: [null, Validators.required],
      status: ['', Validators.required],
      media: [null]
    });

    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId !== "new") {
      this.isEditMode = true;

      this.isAuthorizedAdmin();

    }
    console.log(this.eventId)
  }


  get title() {
    return this.eventForm.get('title');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get date() {
    return this.eventForm.get('date');
  }

  get startTime() {
    return this.eventForm.get('startTime');
  }

  get endTime() {
    return this.eventForm.get('endTime');
  }

  get location() {
    return this.eventForm.get('location');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get category() {
    return this.eventForm.get('category');
  }

  get ticketPrice() {
    return this.eventForm.get('ticketPrice');
  }

  get status() {
    return this.eventForm.get('status');
  }



  isAuthorizedAdmin() {
    // return this.currentLoggedInUser.role === Role.ADMIN;
    this.eventService.isThisMyEvent(this.eventId)
      .subscribe({
        next: response => {
          console.log(response);
          // response.data.isMyEvent;
          this.amAuthorizedAdmin = response.data.isMyEvent;

          if (this.amAuthorizedAdmin) {
            this.eventService.getEventDetails(this.eventId)
              .subscribe({
                next: response => {
                  console.log(response);
                  this.eventForm.patchValue(response.data.event);
                  this.images = response.data.event?.media ? response.data.event?.media.map(url => ({ url })) : [];
                },
                error: error => {
                  console.log(error);
                  this.showSnackBar(error);
                }
              });
          }
        },
        error: error => {
          console.log(error);
          this.amAuthorizedAdmin = false;
          this.showSnackBar(error);
          this.router.navigate(['/events']);
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



  onSubmit() {
    if (this.eventForm.valid) {

      let createOrUpdateEventRequest = new CreateOrUpdateEventRequest()

      // createOrUpdateEventRequest._id = this.eventId
      if(this.eventId !== "new") {
        createOrUpdateEventRequest._id = this.eventId
      } else {
        createOrUpdateEventRequest._id = null
      }
      createOrUpdateEventRequest.title = this.eventForm.value.title
      createOrUpdateEventRequest.description = this.eventForm.value.description
      createOrUpdateEventRequest.date = this.eventForm.value.date
      // createOrUpdateEventRequest.startTime = this.eventForm.value.startTime
      // createOrUpdateEventRequest.endTime = this.eventForm.value.endTime
      createOrUpdateEventRequest.startTime = this.timeToMinutes(this.eventForm.value.startTime)
      createOrUpdateEventRequest.endTime = this.timeToMinutes(this.eventForm.value.endTime)
      createOrUpdateEventRequest.location = this.eventForm.value.location
      createOrUpdateEventRequest.capacity = this.eventForm.value.capacity
      createOrUpdateEventRequest.category = this.eventForm.value.category
      createOrUpdateEventRequest.ticketPrice = this.eventForm.value.ticketPrice
      createOrUpdateEventRequest.status = this.eventForm.value.status
      createOrUpdateEventRequest.media = this.images.map(image => image.url);

      if (this.images.length == 0) {
        this.showSnackBar("Please upload at least one image");
        return;
      }

      console.log(createOrUpdateEventRequest)

      this.eventService.createOrUpdateEvent(createOrUpdateEventRequest)
      .subscribe({
        next: response => {
          console.log(response);
          this.eventForm.patchValue(response.data.event);
          // this.images = response.data.event?.media ? response.data.event?.media.map(url => ({ url })) : [];
          // this.router.navigate(['/events']);
          this.showSnackBar(response.message);
        },
        error: error => {
          console.log(error);
          this.showSnackBar(error);
        }
      });

    }
  }


  onImagesChange(images: { file?: File, preview?: string, url?: string }[]) {
    this.images = images;
    // this.saveImageUrls();
  }




  timeToMinutes(timeStr) {
    // Split the time string into its components
    let [hours, minutes] = timeStr.split(':').map(Number);

    // Convert 12 AM and 12 PM to 0 and 12 respectively
    // if (period === 'AM' && hours === 12) {
    //     hours = 0;
    // } else if (period === 'PM' && hours !== 12) {
    //     hours += 12;
    // }

    // Calculate the total number of minutes past midnight
    let totalMinutes = (hours * 60) + minutes;

    return totalMinutes;
}

convertTo24HourFormat(time: string): string {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  const strHours = hours < 10 ? '0' + hours : hours.toString();
  const strMinutes = minutes < 10 ? '0' + minutes : minutes.toString();

  return `${strHours}:${strMinutes}`;
}

}
