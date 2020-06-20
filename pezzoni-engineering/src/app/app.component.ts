import { Component, Output } from '@angular/core';
import { ImageDetail } from './shared/image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private splashImg: ImageDetail[] = 
  [
    new ImageDetail (
      'KaiserFresno',
      '/images/home-main-image.jpg',
      'Kaiser Fresno Medical Center, Fresno CA'
    ),
    new ImageDetail (
      'GammaKnifeSD',
      '/images/services-main-image.jpg',
      'Gamma-Knife, Cancer Treatment Facility, San Diego CA'
    )
  ];


  
}
