// import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
// import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
  // Adding AccountsService to providers in the Child,
  //    *overrides* the instance of the service in the Parent !!!
  //providers: [LoggingService, AccountsService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  // Since the loggingService is being injected into the 
  //    AccountsService, it is no longer needed here.
  // constructor(private loggingService: LoggingService,
  //             private accountsService: AccountsService) {
  // }
  constructor(private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {

    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);

    /* We no longer need to emit this event, because we are not
    *   listening to it anyways.
    */
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    /*
    * **Never** create services manually:
    *   const service = new LoggingService();
    *   service.logStatusChange(accountStatus); 
    */
    // Old way to console log - will be replaced by an angular service
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
