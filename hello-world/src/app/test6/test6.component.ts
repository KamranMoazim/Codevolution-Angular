import { Component } from '@angular/core';

// here we learned about Event Binding

@Component({
  selector: 'app-test6',
  template: `
    <h1> Welcome {{ name }}! </h1>

    <button (click)="greetUser($event)">Greet</button>
    <button (click)="message = 'Hello Inline ' + this.name;">Greet New</button>
    {{ message }}

  `,
  styles: [`
  `]
})
export class Test6Component {

  public name = "Kamran";
  public message = "";

  greetUser(event) {
    console.log(event);
    console.log(event.type);
    this.message = "Hello " + this.name;
  }

}
