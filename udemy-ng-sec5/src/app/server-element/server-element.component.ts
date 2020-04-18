import { 
  Component, OnInit, Input, ViewEncapsulation, 
  OnChanges, SimpleChanges, DoCheck, 
  AfterContentInit, AfterContentChecked, 
  AfterViewInit, AfterViewChecked, OnDestroy, 
  ViewChild, ElementRef, ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements 
  OnInit, OnChanges, DoCheck, 
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef
  // @contentChild gives us access to content from another component
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef

  // Lifecycle hooks demo
  constructor() { 
    console.log('constructor called!')
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!')
    console.log(changes)
  }

  ngOnInit(): void {
    console.log('ngOnInit called!')
    console.log('Text Content: ' + this.header.nativeElement.textContent);
    console.log('Text Content of paragraph:\n' + this.paragraph.nativeElement.textContent);
  }
  
  // gets called whenever ng checks for any changes 
  // triggers: event called, promise returned, etc
  ngDoCheck() {
    console.log('ngDoCheck called!');
  }
  
  // only called once, after the data is projected into the element through ng-content
  ngAfterContentInit() {
    console.log('ngAfterContentInit called!');
    console.log('Text Content of paragraph:\n' + this.paragraph.nativeElement.textContent);
  }
  
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!');
  }
  
  ngAfterViewInit() {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent);
  }
  
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!');
  }
  
  ngOnDestroy() {
    console.log('ngOnDestroy called!');
  }

}
