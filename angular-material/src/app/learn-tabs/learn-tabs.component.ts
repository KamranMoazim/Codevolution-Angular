import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-tabs',
  templateUrl: './learn-tabs.component.html',
  styleUrl: './learn-tabs.component.css'
})
export class LearnTabsComponent {

  logChange(index: number) {
    console.log('Tab changed to index: ', index);
  }

}
