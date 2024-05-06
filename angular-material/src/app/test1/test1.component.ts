import { Component } from '@angular/core';

// here we learned about ngIf directive

@Component({
  selector: 'app-test1',
  template: `
    <h1 *ngIf="displayName"> Welcome {{ name }}! </h1>
    <button (click)="displayName = !displayName">Toggle Name</button>

    <!-- way 1 -->
    <!-- <h1 *ngIf="!displayName">Name is Hidden</h1>
    <h1 *ngIf="displayName">Name is not Hidden</h1> -->


    <!-- way 2 -->
    <!-- <h1 *ngIf="!displayName; else elseBlock">Name is Hidden</h1>
    <ng-template #elseBlock>
      <h1>Name is not Hidden</h1>
    </ng-template> -->

    <!-- way 3 -->
    <h1 *ngIf="!displayName; then thenBlock else elseBlock"></h1>
    <ng-template #thenBlock>
      <h1>Name is Hidden</h1>
    </ng-template>
    <ng-template #elseBlock>
      <h1>Name is not Hidden</h1>
    </ng-template>

  `,
  styles: [`
  `]
})
export class Test1Component {

  public name = "Kamran";
  displayName = true;

}
