import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-learn-progress-spinner',
  templateUrl: './learn-progress-spinner.component.html',
  styleUrl: './learn-progress-spinner.component.css'
})
export class LearnProgressSpinnerComponent {

  showSpinner = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }
}
