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
import { FormsModule } from '@angular/forms';
import { LearnMenuComponent } from './learn-menu/learn-menu.component';
import { LearnListComponent } from './learn-list/learn-list.component';
import { LearnGridListComponent } from './learn-grid-list/learn-grid-list.component';
import { LearnExpansionPanelComponent } from './learn-expansion-panel/learn-expansion-panel.component';
import { LearnCardComponent } from './learn-card/learn-card.component';


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
    LearnCardComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModulse,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
