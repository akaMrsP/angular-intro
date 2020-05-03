import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // data returned by the resolver is also held in thd "data:" object
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // name here must match the name in the router path resolve: object
      }
    );
    // this.server = this.serversService.getServer(this.route.snapshot.params['id']);
    // const id = +this.route.snapshot.params['id'];  // returns a string, not a number! -> convert to number with +
    // this.server = this.serversService.getServer(id);
    // // react to any changes from this same page as well
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   )
  }

  onEdit() {
    // relative path - you don't need all the other array items
    // queryParamsHandling - merge with additional params or just preserve the ones you currently have
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); 
  }

}
