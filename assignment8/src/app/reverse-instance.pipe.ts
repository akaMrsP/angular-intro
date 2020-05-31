import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseInstance'
})
export class ReverseInstancePipe implements PipeTransform {

  transform(value: any) {
    // let charArray = value.split('');
    // // console.log(charArray);
    // charArray.reverse();
    // let reverseArray = "";
    // for (let i = 0; i < charArray.length; i++){
    //   reverseArray += charArray[i];
    // }
    // return reverseArray;
    return value.split('').reverse().join('');
  }
}
