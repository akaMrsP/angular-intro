import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { loggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [  // order matters!!!
    {
      provide: HTTP_INTERCEPTORS,            // token from which the injection can later be identified
      useClass: AuthInterceptorService,      // the interceptor service to be used
      multi: true                            // can be used more than once
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
