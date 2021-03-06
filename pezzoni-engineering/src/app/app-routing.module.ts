import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services/services.component';
import { MarketsComponent } from './markets/markets.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'utilities', component: UtilitiesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category', component: GalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
