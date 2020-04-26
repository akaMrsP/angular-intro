import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class CounterService {
    // counter = 0;
    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    // updateCounter() {
    //     this.counter++;
    //     console.log(this.counter);
    // }

    updateActiveToInactiveCount() {
        this.activeToInactiveCounter++;
        console.log('Active to Inactive count: ' + 
                    this.activeToInactiveCounter);
    }
    
    updateInactiveToActiveCount() {
        this.inactiveToActiveCounter++;
        console.log('Inactive to Active count: ' +
                    this.inactiveToActiveCounter);
    }
}