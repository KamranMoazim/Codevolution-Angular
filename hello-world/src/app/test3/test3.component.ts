import { Component } from '@angular/core';

// here we learned about Property Binding

// ! Property vs Attribute
// ? Attributes are defined by HTML, properties are defined by DOM
// ! Attributes initialize DOM properties and they are done only once
// ! Property values can change
// Attribute values cannot change once they are initialized
// Interpolation, Property Binding, Event Binding are all ways to set properties


@Component({
  selector: 'app-test3',
  template: `
    <h1> Welcome {{ name }}! </h1>

    <input [id]="myId" type="text" value="Kamran">
    <input [disabled]="isDisabled" [id]="myId" type="text" value="Kamran">
  `,
  styles: [``]
})
export class Test3Component {

  public name = "Kamran";
  public myId = "testId";

  // <input disabled="{{isDisabled}}" [id]="myId" type="text" value="Kamran">
  // vs
  // <input [disabled]="isDisabled" [id]="myId" type="text" value="Kamran">
  // first one is always string and second one can accept different types


  public isDisabled = true;

}
