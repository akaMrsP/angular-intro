import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReverseInstancePipe } from './reverse-instance.pipe';
import { SortServerPipe } from './sort-server.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReverseInstancePipe,
    SortServerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
