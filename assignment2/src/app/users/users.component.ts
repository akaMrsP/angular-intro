import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userName = "";
  isEmptyUserName = true;

  constructor() { }

  ngOnInit(): void {
  }

  onResetUserName() {
    this.userName = "";
    this.isEmptyUserName = true;
  }

  onUpdateUserName () {
    if (this.userName === "") { this.isEmptyUserName = true; }
    else { this.isEmptyUserName = false; }
  }

}
