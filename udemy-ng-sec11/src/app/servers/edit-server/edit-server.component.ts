import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  id: number;

  constructor(private serversService: ServersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  // Use a guard as a service to prevent the user from accidentally navigating away from the page before updating the server
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    // optionally (to react to changed query params):
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.route.fragment.subscribe();
    // id = +this.route.snapshot.params['id'];
    // Subscribe route params to update the id if params change
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.server = this.serversService.getServer(this.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }
 
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Can we leave the page or not?  Put that logic here.
    // If you do not have edit priviledges, there is no chance of unsaved changes, so you can leave
    if (!this.allowEdit) {
      return true;
    }
    // is the server name here different from the server name you had at the beginning? and the changes have not yet been saved.
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      // confirm that they meant to leave without saving
      return confirm('Do you want to discard the changes?');
    } else {
      // otherwise it is safe to leave (changes were saved)
      return true;
    }
      
  }

}
