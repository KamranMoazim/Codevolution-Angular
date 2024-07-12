import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrl: './images-uploader.component.css'
})
export class ImagesUploaderComponent {

  @Input() numberOfImages: number = 5;
  @Input() images: { file?: File, preview?: string, url?: string }[] = [];
  showIcon: number|null = null;

  @Output() imagesChange = new EventEmitter<{ file?: File, preview?: string, url?: string }[]>();

  s3: AWS.S3;

  constructor(
    private snackBar: MatSnackBar
  ) {
    AWS.config.update({
      accessKeyId: 'AKIA3FLD6J5JOC55LSVW',
      secretAccessKey: '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',
      region: 'us-east-1'
    });
    this.s3 = new AWS.S3();
  }



  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length + this.images.length > this.numberOfImages) {
      // alert('You can only upload up to 5 images.');
      this.showSnackBar(`You can only upload up to ${this.numberOfImages} images.`);
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

  changeShowIcon(index: number|null) {
    console.log('changeShowIcon:', index)
    this.showIcon = index;
  }

  removeImage(index: number) {
    this.images.splice(index, 1)[0];
    this.showSnackBar('Image removed.');
  }

  uploadImages() {
    this.showSnackBar('Uploading images...');
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
            this.showSnackBar('Failed to upload images. Please try again.');
          } else {
            console.log('Successfully uploaded image:', data);
            this.images[index].url = data.Location;
            this.showSnackBar(`Image ${index + 1} uploaded successfully.`);

            if (index === this.images.length - 1) {
              this.imagesChange.emit(this.images);
            }
          }
        });
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
