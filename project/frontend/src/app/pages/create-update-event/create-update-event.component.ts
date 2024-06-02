import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AWS from 'aws-sdk';

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
  localImageUrls: string[] = []; // Store the uploaded image URLs locally


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    AWS.config.update({
      accessKeyId: 'YOUR_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      region: 'YOUR_AWS_REGION'
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
      capacity: [null, Validators.required, Validators.min(100)],
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
      // Fetch the event details by ID and set the form values
    }
  }


  get capacity() {
    return this.eventForm.get('capacity');
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      // Submit the event form data
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
      this.localImageUrls = this.localImageUrls.filter(url => url !== removedImage.url);
      this.saveImageUrls(this.localImageUrls);
    }
  }

  uploadImages() {
    this.images.forEach((image, index) => {
      if (image.file) {
        const params = {
          Bucket: 'YOUR_BUCKET_NAME',
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
            this.localImageUrls.push(data.Location);
            this.saveImageUrls(this.localImageUrls);
            delete this.images[index].file;
            delete this.images[index].preview;
          }
        });
      }
    });
  }

  getSavedImageUrls(): string[] {
    // Retrieve saved URLs from local storage or other storage mechanism
    return JSON.parse(localStorage.getItem('savedImageUrls') || '[]');
  }

  saveImageUrls(urls: string[]) {
    // Save URLs to local storage or other storage mechanism
    localStorage.setItem('savedImageUrls', JSON.stringify(urls));
  }

}
