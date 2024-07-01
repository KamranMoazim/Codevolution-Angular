import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(
    private router:Router,
  ){}

  goToEvents(){
    this.router.navigate(['/events/']);
  }

}
