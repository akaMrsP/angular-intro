import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  isVisibleText = false;
  numClicks = 0; 
  clickTime = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  onUpdateVisibility () {
    if (this.isVisibleText) { this.isVisibleText = false; }
    else { this.isVisibleText = true; }
    this.numClicks++;
    this.clickTime.push(new Date().toUTCString());
  }
}
