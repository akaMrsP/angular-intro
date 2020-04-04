import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector: 'app-servers',
  // in-line template:
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = "Testserver";
  userName = "";
  isUsernameEmpty = true;
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    // this.serverCreationStatus = "Server was created!";
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server was created!  Name is " + this.serverName;
  }

  // 2-way data binding means we no longer need this method
  // onUpdateServerName(event: Event) {
  //   // console.log(event);
  //   // event.target.value works if the event is passed in as any
  //   // this.serverName = event.target.value;
  //   // better? to explicitly cast to HTMLInputElement
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }

  onResetUsername() {
    this.userName = "";
    this.isUsernameEmpty = true;
  }

  onUpdateButtonStatus() {
    if (this.userName == "") { this.isUsernameEmpty = true; }
    else { this.isUsernameEmpty = false;  }
  }
}
