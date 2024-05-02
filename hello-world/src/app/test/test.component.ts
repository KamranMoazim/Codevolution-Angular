import { Component } from '@angular/core';

// here we learned about Component

@Component({
  selector: 'app-test', // This is the default selector
  // selector: '.app-test', // This is an attribute selector
  // selector: '[app-test]', // This is a class selector


  // templateUrl: './test.component.html',
  template: `
    <h1>Test Component</h1>
    <p>This is a test component</p>
  `,


  // styleUrl: './test.component.css'
  styles: [`
    h1 {
      color: red;
    }
  `]
})
export class TestComponent {

}
