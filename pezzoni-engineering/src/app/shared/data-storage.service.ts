import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ProjectService } from './project.service';
import { Project } from './project.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  private PROJECT_DATA_URL = environment.projectUrl;

  constructor(private http: HttpClient, private projectService: ProjectService) {}

  fetchProjects() {
      return this.http
          .get<Project[]>(this.PROJECT_DATA_URL)
          .pipe(
              map(projects => {
                  return projects.map(project => {
                      return {
                          ...project,
                          images: project.images ? project.images : []
                      };
                  });
              }),
              tap(projects => {
                  this.projectService.setProjects(projects);
              })
          )
  }

  // storeProjects() {
  //     const projects = this.projectService.getProjects('');
  //     console.log(projects);

  //     this.http
  //         .put(PROJECT_DATA_URL, projects)
  //         .subscribe(response => {
  //             console.log(response);
  //         });
  // }
}
