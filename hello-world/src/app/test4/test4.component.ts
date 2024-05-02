import { Component } from '@angular/core';

// here we learned about Class Binding



@Component({
  selector: 'app-test4',
  template: `
    <h1> Welcome {{ name }}! </h1>
<!--
    <h2 class="text-success">Kamran</h2>
    <h2 [class]="successClass">Kamran</h2> -->

    <!-- in following only one will work, not both -->
    <!-- in following only one will work, BUT IN TESTING BOTH ARE WORKING -->
    <h2 class="text-special" [class]="successClass">Kamran</h2>

    <!-- <h2 [class.text-danger]="hasError">Kamran</h2>
    <h2 [class.text-danger]="105%2 == 6">Kamran</h2>

    <h2 [ngClass]="messageClasses">Kamran</h2> -->

  `,
  styleUrls:["./test4.component.css"]
})
export class Test4Component {

  public name = "Kamran";
  public successClass = "text-success"
  public hasError = true
  public isSpecial = true


  public messageClasses = {
    "text-success": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial
  }

}
