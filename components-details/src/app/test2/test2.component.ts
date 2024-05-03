import { Component } from '@angular/core';

// here we learned about Pipes in Angular

@Component({
  selector: 'app-test2',
  template: `
  <h2> {{ name }} </h2>
  <h2> {{ name | uppercase }} </h2>
  <h2> {{ name | lowercase }} </h2>
  <h2> {{ message | titlecase }} </h2>
  <h2> {{ name | slice:3:5 }} </h2>
  <h2> {{ person | json }} </h2>
  <hr>
  <hr>

  <h2> {{ number | number:'1.2-3' }} </h2>
  <h2> {{ number | number:'3.4-5' }} </h2>
  <h2> {{ number | number:'3.1-2' }} </h2>
  <hr>
  <hr>

  <h2> {{ amount | currency }} </h2>
  <h2> {{ amount | currency:"GBP" }} </h2>
  <h2> {{ amount | currency:"EUR":"code" }} </h2>
  <hr>
  <hr>

  <h2> {{ date }} </h2>
  <h2> {{ date | date:"short" }} </h2>
  <h2> {{ date | date:"shortDate" }} </h2>
  <h2> {{ date | date:"shortTime" }} </h2>
`,
styles: [`
`]
})
export class Test2Component {

  name = "Kamran";
  message = "Welcome here kamran !!!";
  person = {
    "firstName": "John",
    "lastName": "Doe"
  };

  number = 5.678;
  amount = 0.25;

  date = new Date();

}

