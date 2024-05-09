import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { LearnTypographyComponent } from './learn-typography/learn-typography.component';
import { LearnButtonComponent } from './learn-button/learn-button.component';
import { LearnButtonToggleComponent } from './learn-button-toggle/learn-button-toggle.component';
import { LearnIconComponent } from './learn-icon/learn-icon.component';
import { LearnBadgesComponent } from './learn-badges/learn-badges.component';
import { LearnProgressSpinnerComponent } from './learn-progress-spinner/learn-progress-spinner.component';
import { LearnToolbarComponent } from './learn-toolbar/learn-toolbar.component';
import { LearnSidenavComponent } from './learn-sidenav/learn-sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LearnMenuComponent } from './learn-menu/learn-menu.component';
import { LearnListComponent } from './learn-list/learn-list.component';
import { LearnGridListComponent } from './learn-grid-list/learn-grid-list.component';
import { LearnExpansionPanelComponent } from './learn-expansion-panel/learn-expansion-panel.component';
import { LearnCardComponent } from './learn-card/learn-card.component';
import { LearnTabsComponent } from './learn-tabs/learn-tabs.component';
import { LearnStepperComponent } from './learn-stepper/learn-stepper.component';
import { LearnInputComponent } from './learn-input/learn-input.component';
import { LearnSelectComponent } from './learn-select/learn-select.component';
import { LearnAutocompleteComponent } from './learn-autocomplete/learn-autocomplete.component';
import { LearnCheckboxRadioButtonComponent } from './learn-checkbox-radio-button/learn-checkbox-radio-button.component';
import { LearnDatepickerComponent } from './learn-datepicker/learn-datepicker.component';
import { LearnTooltipComponent } from './learn-tooltip/learn-tooltip.component';
import { CustomSnackbarComponent, LearnSnackbarComponent } from './learn-snackbar/learn-snackbar.component';
import { LearnDialogComponent } from './learn-dialog/learn-dialog.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { LearnTableComponent } from './learn-table/learn-table.component';
import { LearnVirtualScrollingComponent } from './learn-virtual-scrolling/learn-virtual-scrolling.component';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LearnTypographyComponent,
    LearnButtonComponent,
    LearnButtonToggleComponent,
    LearnIconComponent,
    LearnBadgesComponent,
    LearnProgressSpinnerComponent,
    LearnToolbarComponent,
    LearnSidenavComponent,
    LearnMenuComponent,
    LearnListComponent,
    LearnGridListComponent,
    LearnExpansionPanelComponent,
    LearnCardComponent,
    LearnTabsComponent,
    LearnStepperComponent,
    LearnInputComponent,
    LearnSelectComponent,
    LearnAutocompleteComponent,
    LearnCheckboxRadioButtonComponent,
    LearnDatepickerComponent,
    LearnTooltipComponent,
    LearnSnackbarComponent,
    CustomSnackbarComponent,
    LearnDialogComponent,
    DialogExampleComponent,
    LearnTableComponent,
    LearnVirtualScrollingComponent
  ],
  // entryComponents:[],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModulse,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
