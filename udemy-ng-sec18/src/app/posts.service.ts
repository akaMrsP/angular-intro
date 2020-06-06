import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PostsService {
    error = new Subject<string>();
    databaseURL = 'https://ng-complete-guide-98127.firebaseio.com/posts.json';

    constructor(private http: HttpClient) {}

    // http request methods go here - we only want the responses/request status in the front-end
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        // send HTTP request to create new posts
        this.http
        // The <> information is totally optional, but helpful and recommended for ease of coding & dealing with data
            // gives us better code completion and reduces risk for typescript errors
            // When we submit a post, we get an Object with a "name" property back
        .post<{ name: string }>(
            // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
            // The .json on the end is a Firebase requirement only
            this.databaseURL,
            postData,  // ng automatically converts our js object to .json for us
            // get *full* response!  (not just the unpacked response data)
            {   // observe changes the type of data you get back.
                observe: 'response' // instead of just access to the body (default), now we also have access to headers, status, etc.
            }
        ) // Subscription required or request won't be sent!  Someone has to be interested in the response.
        .subscribe(responseData => {    // unpacked response data
            console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts() {
        // To submit multiple params, create new param objects and ??
        let searchParams = new HttpParams();  // const is immutable, so use let instead
        searchParams = searchParams.append('print', 'pretty');  // just formats the request response nicely
        searchParams = searchParams.append('custom', 'key');    // made up for demo
        // send HTTP request to fetch existing posts
        // this.http
        // Since only one component is using this service - just return the result.  
            // You would need to use a Subject if multiple components were interested.
        return this.http
            // .get is a "generic" method, so you can store a response body type in <> (what the .get will return)
            // .get('https://ng-complete-guide-98127.firebaseio.com/posts.json')
            .get<{ [key: string]: Post }>(
                this.databaseURL,
                // configure headers - 2nd argument to GET
                {
                    headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),  // configure as many headers as you want???
                    // set query parameters, too! (more convenient than putting the params in the URL itself!)
                    // params: new HttpParams().set('print', 'pretty')  // set a single query parameter
                    params: searchParams,  // set multiple query parameters (defined above using append)
                    responseType: 'json'    // default is json, so does not have to be explicitly coded (overwritten) here
                    // responseType: 'text'    // Whoa!!! Breaks our app, because we *need* the js object <{ [key: string]: Post }>!
                                                // response type *cannot* be both a string *and* a js object! (ts will catch this!)
                                                // can be used to prevent ng from parsing the object, so you can parse it yourself!
                }
            )
                // assign a type on the argument we are getting, so ts will know how to format our posts
                // .pipe(map((respsonseData: { [key: string]: Post }) => {   // Post from post.model like above (name, content, & id)
            .pipe(
                map(responseData => {   // more elegant way to assign type -> move it (ts format) to the .get above
                // turn the js object into an array (to forward to our subscribe function)
                // (using observables to transform our data!)
                const postsArray: Post[] = [];
                for (const key in responseData) {
                    // Good practice to wrap this in an if statement 
                    if (responseData.hasOwnProperty(key)) {
                        // use spread operator to pull out all the key:value pairs!
                        // Also, add a key:value pair for id (the Firebase ID, which is unique)
                        postsArray.push({ ...responseData[key], id:key });  
                    }
                }
                return postsArray;
            }), // add an argument to handle a pipe error
            catchError(errorRes => {
                // Send to analytics server, user message, etc -> then pass it on!
                return throwError(errorRes);
            })
        );
    }

    deletePosts() {
        // Delete *all* posts
        // Use return to be informed of the deletion process.  Subscription happens in component, because user needs to know.
        return this.http
            .delete(
                this.databaseURL,
                {
                    // observe: 'body' // 'body' is the default - can also use 'response' or 'events'
                    observe: 'events',      // configure observe mode
                    // responseType: 'json'    // configure response type (tells ng to parse and store in a js object)
                    // responseType: 'blob'    // configure response type (tells ng this is a file, for example)
                    responseType: 'text'    // configure response type (tells ng to parse and keep as text! Do NOT convert to js object!)
                                                    // we can tell because 'body' in the response is wrapped in quotation marks!
            })
            .pipe(
                tap(event => {       // tap allows for execution of code without altering the response or interrupting subscriptions (observables)
                    console.log(event);     // Does not need to be returned, because of tap, response just passes through
                    // response will return numbers, but we have a more convenient way!
                    if (event.type === HttpEventType.Response) {  // HttpEventType is a ts-only thing that maps numbers to the type of event they represent
                        console.log(event.body);    // because the event type was a response, we know we can safely access the body
                    }   
                    if (event.type === HttpEventType.Sent) {  // Sent means there is no body to access!  Now we know!
                        // Maybe update the UI to inform the user?  
                    }
                })
            );
    }
}
