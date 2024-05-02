import { Component } from '@angular/core';

// here we learned about Interpolation

@Component({
  selector: 'app-test2',
  // template: ``,
  // styles: [``]
  template: `
    <h1> Welcome {{ name }}! </h1>
    <h2>{{2+2}}</h2>
    <h2>{{"Welcome " + name}}</h2>
    <h2>{{name.length}}</h2>
    <h2>{{name.toUpperCase()}}</h2>
    <h2>{{greetUser()}}</h2>
    <h2>{{siteUrl}}</h2>
  `,
  styles: [``]
})
export class Test2Component {

  public name = "Kamran";
  public siteUrl = window.location.href;

  greetUser(){
    return "Hello " + this.name;
  }

}
