import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-learn-dialog',
  templateUrl: './learn-dialog.component.html',
  styleUrl: './learn-dialog.component.css'
})
export class LearnDialogComponent {

  constructor(
    private matDiaog: MatDialog
  ) { }

  openDilaog(){
    let dialogRef = this.matDiaog.open(DialogExampleComponent, {data: {name: 'Kamran'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.afterOpened().subscribe(() => {
      console.log(`Dialog opened`);
    });
  }

}
