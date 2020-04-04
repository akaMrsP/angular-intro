import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SuccessAlert } from './success/success.component';
import { WarningAlert } from './failure/failure.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessAlert,
    WarningAlert
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
