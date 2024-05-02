import { Component } from '@angular/core';

// here we learned about Class Binding



@Component({
  selector: 'app-test5',
  template: `
    <h1> Welcome {{ name }}! </h1>

    <h2 [style.color]="'orange'">Style Binding</h2>
    <h2 [style.color]="hasError? 'red' : 'orange'">Style Binding</h2>
    <h2 [style.color]="highlightColor">Style Binding</h2>

    <h2 [ngStyle]="titleStyles">Style Binding</h2>
    <h2 [ngStyle]="{
      color:'blue',
      fontSize:'100px'
    }">Style Binding</h2>
  `,
  styles: [`
  `]
})
export class Test5Component {

  public name = "Kamran";
  public hasError = true;

  public highlightColor = "dodgerblue";

  public titleStyles = {
    color:"gray",
    fontSize:"100px"
  }


}
