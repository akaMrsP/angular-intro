// import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
// import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})

export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  // constructor(private loggingService: LoggingService,
  //             private accountsService: AccountsService) {
  // }
  constructor(private accountsService: AccountsService) {}

  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountsService.statusUpdated.emit(status);
  } 
}
