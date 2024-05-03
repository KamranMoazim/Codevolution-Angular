import { Component } from '@angular/core';

// here we learned about Two Way Binding

@Component({
  selector: 'app-test8',
  template: `
    <h1> Welcome {{ name }}! </h1>

    <input type="text" [(ngModel)]="name">

  `,
  styles: [`
  `]
})
export class Test8Component {

  public name = "Kamran";

}
