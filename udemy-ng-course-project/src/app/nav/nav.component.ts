// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

}

// routing eliminates need for event emitter!
// export class NavComponent implements OnInit {
//   @Output() featureSelected = new EventEmitter<string>();

//   constructor() { }

//   ngOnInit(): void {
//   }

//   onSelect(feature: string) {
//     this.featureSelected.emit(feature);
//   }

// }
