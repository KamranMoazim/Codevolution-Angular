import { Component } from '@angular/core';

// here we learned about ngFor directive

@Component({
  selector: 'app-test3',
  template: `
    <h3> Welcome {{ name }}! </h3>

    <!-- <div *ngFor="let color of colors; index as i">
      <h3> {{ i }} {{ color }} </h3>
    </div> -->

    <!-- <div *ngFor="let color of colors; last as l">
      <h3> {{ l }} {{ color }} </h3>
    </div> -->

    <!-- <div *ngFor="let color of colors; first as f">
      <h3> {{ f }} {{ color }} </h3>
    </div> -->

    <!-- <div *ngFor="let color of colors; even as e">
      <h3> {{ e }} {{ color }} </h3>
    </div> -->

    <div *ngFor="let color of colors; odd as o">
      <h3> {{ o }} {{ color }} </h3>
    </div>
  `,
  styles: [`
  `]
})
export class Test3Component {

  public name = "Kamran";

  colors = ["red", "blue", "green", "orange"];

}
