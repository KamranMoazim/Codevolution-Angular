import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-learn-snackbar',
  templateUrl: './learn-snackbar.component.html',
  styleUrl: './learn-snackbar.component.css'
})
export class LearnSnackbarComponent {

  constructor(
    private snackBar: MatSnackBar
  ){}

  openSnackBar(message, action){
    let snackBarRef = this.snackBar.open(message, action, {duration:2000})

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("snackBar was dismissed")
    })

    snackBarRef.onAction().subscribe(() => {
      console.log("snackBar action was triggered")
    })
  }

  openCustomSnackbarComponent(){
    this.snackBar.openFromComponent(CustomSnackbarComponent, {duration:2000})
  }

}






@Component({
  selector: 'app-custom-snackbar',
  template: `<span style="color: orange;"> Custom Snackbar </span>`,
})
export class CustomSnackbarComponent {}
