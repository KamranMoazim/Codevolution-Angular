import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing/app-routing.module';


import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { HeroComponent } from './components/hero/hero.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrganizationDetailComponent } from './pages/organization-detail/organization-detail.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { UserAttendEventsComponent } from './pages/user-attend-events/user-attend-events.component';
import { AdminCreatedEventsComponent } from './pages/admin-created-events/admin-created-events.component';
import { CreateUpdateEventComponent } from './pages/create-update-event/create-update-event.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { GenericPaginationComponent } from './components/generic-pagination/generic-pagination.component';
import { AdminComponent } from './components/admin/admin.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { DatePipe } from '@angular/common';
import { OrganizationCardComponent } from './components/organization-card/organization-card.component';
import { ImagesUploaderComponent } from './components/images-uploader/images-uploader.component';
// import { AttendedEventsComponent } from './pages/attended-events/attended-events.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    // routingComponents,
    LoginComponent,
    RegisterComponent,
    EventCardComponent,
    HomeComponent,
    AllEventsComponent,
    HeroComponent,
    ProfileComponent,
    OrganizationDetailComponent,
    OrganizationComponent,
    UserAttendEventsComponent,
    AdminCreatedEventsComponent,
    CreateUpdateEventComponent,
    EventDetailsComponent,
    EventRatingComponent,
    EventsListComponent,
    GenericPaginationComponent,
    // AttendedEventsComponent
    AdminComponent,
    FilterDialogComponent,
    OrganizationCardComponent,
    ImagesUploaderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,

    FlexLayoutModule,
    NgxMaterialTimepickerModule,
    // CarouselModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
