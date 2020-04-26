import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // activeUsers: string[] = [];
  // inactiveUsers: string[] = [];
  // // // inactiveUsers = ['Chris', 'Manu'];

  // constructor(private usersService: UsersService) {}

  // ngOnInit() {
  //   this.activeUsers = this.usersService.activeUsers;
  //   this.inactiveUsers = this.usersService.inactiveUsers;
  // }
}
