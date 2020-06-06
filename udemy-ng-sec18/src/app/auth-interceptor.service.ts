import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// An interceptor is a special type of service,
// used to attach a header to every request automatically.
    // Implements HttpInterceptor, which forces the intercept method
export class AuthInterceptorService implements HttpInterceptor {
    // this method runs right before *any* request leaves our app        
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // To restrict which requests are intercepted, add req.url check here         
        // console.log('Request is on its way');
        // console.log(req.url);

        // request is immutable - cannot set req.url for example
        // to modify the original, clone it into a new request
        // change params, or add to the original params
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        // const modifiedRequest = req.clone({url: 'some-new-url', headers: req.headers.append('Auth', 'xyz')});

        return next.handle(modifiedRequest);    // next allows it to continue - mandatory!!!
        // return next.handle(modifiedRequest).pipe(
        //     tap(event => {     // interceptor always has an event
        //         console.log(event);
        //         if (event.type === HttpEventType.Response) {
        //             console.log('Response arrived, body data: ');
        //             console.log(event.body);
        //         }
        //     })
        // );    // request with a response in it, wrapped in an observable
        // return next.handle(req);    // next allows it to continue - mandatory!!!
    }
}