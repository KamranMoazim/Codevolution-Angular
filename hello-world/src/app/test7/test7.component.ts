import { Component } from '@angular/core';

// here we learned about Template Reference Variable

@Component({
  selector: 'app-test7',
  template: `
    <h1> Welcome {{ name }}! </h1>

    <input type="text" #myInput>
    <!-- <button (click)="logMessage(myInput.value)">Show Message</button> -->
    <button (click)="logMessage2(myInput)">Show Message and Clear Input</button>
    {{ message }}

  `,
  styles: [`
  `]
})
export class Test7Component {

  public name = "Kamran";
  public message = "";

  logMessage(message) {
    console.log(message);
    this.message = message;

  }

  logMessage2(event) {
    console.log(event.value);
    this.message = event.value;

    event.value = "";
  }

}
