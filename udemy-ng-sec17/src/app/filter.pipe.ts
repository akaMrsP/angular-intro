import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // Note that the pipe is NOT rerun every time the underlying object is changed!
      //  - this is a performance issue
      //  - you can force it - but be aware of the potential performance hit
  pure: false     // default is true - used to force a pipe rerun when underlying object is changed
})

export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): unknown {
    // check for an empty array
    if (value.length === 0 || filterString === '') {
      return value;
    }

    // iterate through the servers in the array to check for status
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
