import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-sidenav',
  templateUrl: './learn-sidenav.component.html',
  styleUrl: './learn-sidenav.component.css'
})
export class LearnSidenavComponent {

  opened = false;

  log(state) {
    console.log(state);
  }

}
