import { Component, EventEmitter, Input, Output } from '@angular/core';

// here we learned about Input and Output Parent Directives

@Component({
  selector: 'app-test1',
  template: `
    <h2> Welcome in Child - from Parent we are getting ----- {{ name }}! </h2>
    <button (click)="sendEventToParent()">Send Event to Parent</button>
`,
styles: [`
`]
})
export class Test1Component {

  @Input("parentData") public name;

  @Output("eventFromChildToParent") public childEvent = new EventEmitter();

  sendEventToParent() {
    this.childEvent.emit("Hey Parent! you send me this message ---- " + this.name);
  }

}
