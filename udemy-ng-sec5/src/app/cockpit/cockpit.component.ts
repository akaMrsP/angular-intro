import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  // lifecycle hook 
  // Called once the component is initialized (after the constructor)
  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    //console.log(this.serverContentInput);
    // console.log(nameInput.value);
    this.serverCreated.emit({
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
    });
  }
  
  onAddBlueprint(nameInput: HTMLInputElement) {
    // console.log(this.serverContentInput);
    // You *can* modify the element, but you should NOT
    // this.serverContentInput.nativeElement.value = 'Something';
    this.bluePrintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
