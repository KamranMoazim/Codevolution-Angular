import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'components-details';

  public name = "Kamran";
  public message = "";

  getEventFromChild($event) {
    this.message = $event;
  }
}
