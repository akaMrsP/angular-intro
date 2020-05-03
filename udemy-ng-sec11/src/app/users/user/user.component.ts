import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
// export class UserComponent implements OnInit, OnDestroy {
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  // paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  // updates the user when switching to this component
  // A link to this compnonent *on* this component will
  //     *not* load the new data from the params.
  // This is the default behavior (why re-render when we are already here?)
  ngOnInit(): void {
    // snapshot is fine for initial loading of data
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // params here is an observable - subscribes to a potential future event
    //    observables allow us to easily work with
    //      asynchronous tasks (like loading another
    //      user with routing params from this component!)
    /* First argument: update data when params change
     *  
    */
   // this.paramsSubscription = this.route.params
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  // Angular handles params subscription destruction upon comonent destruction for you!
  // This is *not* true for custom observables.
  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }

}
