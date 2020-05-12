import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  // params is an observable to which we subscribe
  //    This informs us of changes to the data
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate() {
    // Forget event emitters, we are going to use Subject instead
    // This is "passive" - you wait around for an event to happen
    // this.userService.activatedEmitter.emit(true);

    // A Subject is a special kind of observable
    // This is "active" - *you* call for the next value - don't just wait around
    this.userService.activatedEmitter.next(true);
  }
}
