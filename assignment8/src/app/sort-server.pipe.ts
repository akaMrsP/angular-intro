import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortServer',
  pure: false   // causes refresh *every* time the list changes
})
export class SortServerPipe implements PipeTransform {

  transform(value: any, propName: string) {
    return value.sort((a, b) => {
      if (a[propName] > b[propName]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  // transform(value: any) {
  //   // Grab the names and sort them
  //   let serverNames = [];
  //   for (let i = 0; i < value.length; i++) {
  //     serverNames.push(value[i].name);
  //   }
  //   serverNames.sort();    
  //   // console.log(serverNames);

  //   let newServerArray = [];   
  //   let serverNameIndex = 0; 

  //   // Use the sorted names to push the objects in order
  //   while (serverNameIndex < serverNames.length) {
  //     let nameFound = false;
  //     for (let i = 0; i < value.length && !nameFound; i++) {
  //       if (value[i].name == serverNames[serverNameIndex]) {
  //         newServerArray.push(value[i]);
  //         serverNameIndex++;
  //         nameFound = true;
  //       }
  //     }
  //   }
  //   // console.log(newServerArray);

  //   return newServerArray;
  // }

}
