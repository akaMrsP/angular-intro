import { PipeTransform, Pipe } from '@angular/core';

// pipe decorator required 
@Pipe({
    name: 'shorten'
})

// Be sure to add "implements PipeTransform" to force the transform method
//  - don't forget to add this class to the @NgModule declarations in app.module.ts
export class ShortenPipe implements PipeTransform {
    // pipes have one special method: transform
    //  - can use any number of parameters
    transform(value: any, limit: number) {
        if (value.length > limit) {
            return value.substr(0, limit) + ' ...';
        }
        return value;
    }
}