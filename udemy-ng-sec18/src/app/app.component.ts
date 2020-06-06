import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  // Inject HttpClient in order to send requests
  constructor(private http: HttpClient, 
              private postsService: PostsService) {}

  ngOnInit() {
    // This subscription requires an unsubscribe to prevent memory leaks.
    // Using a Subject to forward the error message to the component.
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postsService.fetchPosts()      
      .subscribe(posts => {
        // could transform data received here, but observables are good practice
        // console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
    }, error => {     // only one way to handle errors, could also use a Subject!
      this.isFetching = false;  // We are *not* fetching if we encounter an error!
      this.error = error.message;
      console.log("full error: ");
      console.log(error);
      console.log("error status: " + error.status);
    });
  }

  // onCreatePost(postData: { title: string; content: string }) { // replaced with post.model
  onCreatePost(postData: Post) {
    // This one line (plus the constructor addition of the service) puts the workload onto the service
    // Because we send a request, but don't subscribe here (we subscribe in the service), we should use a Subject for error handling
    this.postsService.createAndStorePost(postData.title, postData.content);
    // MOVED TO THE SERVICE
    // Send Http request
    // this.http
    //   // The <> information is totally optional, but helpful and recommended for ease of coding & dealing with data
    //     // gives us better code completion and reduces risk for typescript errors
    //     // When we submit a post, we get an Object with a "name" property back
    //   .post<{ name: string }>(
    //     // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     // The .json on the end is a Firebase requirement only
    //     'https://ng-complete-guide-98127.firebaseio.com/posts.json',
    //     postData  // ng automatically converts our js object to .json for us
    //   ) // Subscription required or request won't be sent!  Someone has to be interested in the response.
    //   .subscribe(responseData => {
    //     console.log(responseData);
      // });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts()      
      // Does not currently handle errors
      .subscribe(posts => {
        // could transform data received here, but observables are good practice
        // console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
    }, error => {     // only one way to handle errors, could also use a Subject!
      this.isFetching = false;  // We are *not* fetching if we encounter an error!
      this.error = error.message;
    }); // Add error handling!!!  Help the user have a better experience when things go wrong.
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  // MOVED TO THE SERVICE!!!
  // private fetchPosts() {
  //   this.isFetching = true;
    // this.http
    //   // .get is a "generic" method, so you can store a response body type in <> (what the .get will return)
    //   // .get('https://ng-complete-guide-98127.firebaseio.com/posts.json')
    //   .get<{ [key: string]: Post }>('https://ng-complete-guide-98127.firebaseio.com/posts.json')
    //     // assign a type on the argument we are getting, so ts will know how to format our posts
    //     // .pipe(map((respsonseData: { [key: string]: Post }) => {   // Post from post.model like above (name, content, & id)
    //   .pipe(
    //     // This would be better outsourced to a service!!!
    //     map(responseData => {   // more elegant way to assign type -> move it (ts format) to the .get above
    //       // turn the js object into an array (to forward to our subscribe function)
    //       // (using observables to transform our data!)
    //       const postsArray: Post[] = [];
    //       for (const key in responseData) {
    //         // Good practice to wrap this in an if statement 
    //         if (responseData.hasOwnProperty(key)) {
    //           // use spread operator to pull out all the key:value pairs!
    //             // Also, add a key:value pair for id (the Firebase ID, which is unique)
    //           postsArray.push({ ...responseData[key], id:key });  
    //         }
    //       }
    //       return postsArray;
    //     })
    //   )
    //   // small problem - posts are type any[] - ts does not know how to format our posts
    //   .subscribe(posts => {
    //     // could transform data received here, but observables are good practice
    //     // console.log(posts);
    //     this.loadedPosts = posts;
    //     this.isFetching = false;
    //   });
  // }
}
