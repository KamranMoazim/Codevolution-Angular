import { Component } from '@angular/core';

// here we learned about ngSwitch directive

@Component({
  selector: 'app-test2',
  template: `
    <h2> Welcome {{ name }}! </h2>

    <div [ngSwitch]="color">
      <div *ngSwitchCase="'red'">You picked red color</div>
      <div *ngSwitchCase="'blue'">You picked blue color</div>
      <div *ngSwitchCase="'green'">You picked green color</div>
      <div *ngSwitchCase="'orange'">You picked orange color</div>
      <div *ngSwitchDefault>Pick again</div>
    </div>

  `,
  styles: [`
  `]
})
export class Test2Component {

  public name = "Kamran";

  color = "orange";

}
