import { Component, OnInit, OnDestroy } from '@angular/core';
// import { interval, Subscription, Observable } from 'rxjs';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    // interval is more of a utility function than a custom observable
    // interval(period: 1000).subscribe(next: count => {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // let's implement this in a true custom observable
      // rxjs will pass in an argument automatically to the anonymous function
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      // setInterval( handler: () => {
      setInterval( () => {
        observer.next(count);  // .error and .complete are other important functions
        if (count === 2) {
          observer.complete();  // we tell it when it is done!!!
        }
        if (count > 3) {
          // observer.error(new Error(message: 'Count is greater than 3!'));
          observer.error(new Error('Count is greater than 3!'));  // throwing an error cancels the event! (does not count as "complete")
        }
        count++;
      }, 1000);
    });

    // operators can be used on any observable (even ones you can't change the code for, such as params)
    // customIntervalObservable.pipe(map((project: data) => {
    // customIntervalObservable.pipe(map((data: number) => {
    //   return 'Round: ' + (data + 1);
    // }));

    // this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0; // return true or false
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
      // console.log('Round: ' + (data + 1));  // instead of doing this here - we should do it earlier!
    }, error => {         // unhandled errors show up red in the dev tools console
      console.log(error); // can also send to a database, or notify the user
      alert(error.message); // notifying the user
    }, () => {
      console.log('Completed!');  // react to observable completion (a completed observable does not require unsubscription)
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();  // doesn't throw an error if the observable is stopped for reasons.
  }

}
