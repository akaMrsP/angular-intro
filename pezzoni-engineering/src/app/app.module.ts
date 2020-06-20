import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ServicesComponent } from './services/services.component';
import { MarketsComponent } from './markets/markets.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectComponent } from './gallery/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ServicesComponent,
    MarketsComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    UtilitiesComponent,
    GalleryComponent,
    ProjectComponent
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
