import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { Test4Component } from './test4/test4.component';
import { Test5Component } from './test5/test5.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Test2Component,
    Test3Component,
    Test4Component,
    Test5Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
