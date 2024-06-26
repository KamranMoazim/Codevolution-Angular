import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AWS from 'aws-sdk';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-create-update-event',
  templateUrl: './create-update-event.component.html',
  styleUrl: './create-update-event.component.css'
})
export class CreateUpdateEventComponent {

  eventForm: FormGroup;
  statusOptions = ['upcoming', 'ongoing', 'past'];

  isEditMode = false;
  eventId: string = null;

  images: { file?: File, preview?: string, url?: string }[] = [];
  s3: AWS.S3;
  // localImageUrls: string[] = []; // Store the uploaded image URLs locally


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private eventService:EventService) {
    AWS.config.update({
      accessKeyId: 'AKIA3FLD6J5JOC55LSVW',
      secretAccessKey: '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',
      region: 'us-east-1'
    });
    this.s3 = new AWS.S3();
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

    // Load existing image URLs from local storage or other sources
    // const savedUrls = this.getSavedImageUrls();
    // if (savedUrls) {
    //   this.localImageUrls = savedUrls;
    //   this.images = savedUrls.map(url => ({ url }));
    // }

    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;

      // Fetch the event data from the server
      this.eventService.getEventDetails(this.eventId).subscribe(data => {
        console.log(data)
        this.eventForm.patchValue(data.data.event);

        this.images = data.data.event.media.map(url => ({ url }));
      });
    }
    console.log(this.eventId)
  }


  get capacity() {
    return this.eventForm.get('capacity');
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      // Submit the event form data
      let allImagesUrls = this.images.map(image => image.url);
      console.log(allImagesUrls)
    }
  }


  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length + this.images.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    const removedImage = this.images.splice(index, 1)[0];
    if (removedImage.url) {
      // Remove the URL from local storage if the image has already been uploaded
      // this.localImageUrls = this.localImageUrls.filter(url => url !== removedImage.url);
      // this.saveImageUrls(this.localImageUrls);
    }
  }

  uploadImages() {
    this.images.forEach((image, index) => {
      if (image.file) {
        const params = {
          Bucket: 'edusculpt-bucket-prod',
          Key: `uploads/${image.file.name}`,
          Body: image.file,
          ACL: 'public-read'
        };

        this.s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.error('Error uploading image:', err);
          } else {
            console.log('Successfully uploaded image:', data);
            this.images[index].url = data.Location;
            // this.localImageUrls.push(data.Location);
            // this.saveImageUrls(this.localImageUrls);
            // delete this.images[index].file;
            // delete this.images[index].preview;
          }
        });
      }
    });
  }

}
