import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    console.log(this.projects);
  }

}
