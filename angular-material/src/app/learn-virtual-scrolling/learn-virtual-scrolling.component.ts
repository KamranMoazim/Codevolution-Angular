import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-virtual-scrolling',
  templateUrl: './learn-virtual-scrolling.component.html',
  styleUrl: './learn-virtual-scrolling.component.css'
})
export class LearnVirtualScrollingComponent {

  numbers = [];

  constructor(){
    for(let i=0; i<1000; i++){
      this.numbers.push(i)
    }
  }

}
