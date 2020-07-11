import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  // onSaveData() {
  //   this.dataStorageService.storeProjects();
  // }

}
