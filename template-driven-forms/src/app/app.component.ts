import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'structural-directives';
  topicHasError = true;
  topics = ['Angular', 'React', 'Vue'];
  formSubmitted = false;
  formErrorMessage = "";

  userModel = new User('kamran', "rob@mail.com", 1234567890, 'default', 'morning', true);

  constructor(
    private _enrollmentService: EnrollmentService
  ) {}

  validateTopic(value: string) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }


  onSubmit(){
    // console.log(this.userModel)
    this.formSubmitted = true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.formErrorMessage = error.statusText
      )
  }
}
