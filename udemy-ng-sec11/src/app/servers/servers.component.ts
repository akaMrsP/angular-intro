import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // Doesn't know where you are by default - so / is not necessary
    // this.router.navigate(['/servers']);

    // To make the path relative, use relativeTo (then you will need the /)
    // To know our currently active route, use ActivatedRoute
    // this.router.navigate(['/servers'], {relativeTo: this.route});

    this.router.navigate(['servers']);
  }

}
