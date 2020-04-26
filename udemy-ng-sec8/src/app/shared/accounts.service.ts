import { LoggingService } from './logging.service';
import { Injectable, EventEmitter } from '@angular/core';

// @Injectable *only has to be* added to a service that will use another service!
// However, convention states we add @Injectable to every service
@Injectable({providedIn: 'root'})

export class AccountsService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    statusUpdated = new EventEmitter<string>();

    // Injecting a service into a service!!!
    //  Don't forget the metadata!
    constructor(private loggingService: LoggingService) {}

    addAccount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
        this.loggingService.logStatusChange(status);
    }

    updateStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}