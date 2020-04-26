import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
// import { AccountsService } from './shared/accounts.service';
// import { LoggingService } from './shared/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  // AccountsService here provides an application-wide instance
  //    of the AccountsService
  // Available to all, can still be overridden by any
  // providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent]
})

// Can *only* inject a service into another service in the 
//  AppModule !!!

export class AppModule { }
