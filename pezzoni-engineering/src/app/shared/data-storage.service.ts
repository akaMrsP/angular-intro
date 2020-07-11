import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ProjectService } from './project.service';
import { Project } from './project.model';


@Injectable({providedIn: 'root'})

export class DataStorageService {

    private projectDataURL = 'https://pezzoni-engineering.firebaseio.com/projects.json';

    constructor(private http: HttpClient, private projectService: ProjectService) {}

    // storeProjects() {
    //     const projects = this.projectService.getProjects('');
    //     console.log(projects);

    //     this.http
    //         .put(this.projectDataURL, projects)
    //         .subscribe(response => {
    //             console.log(response);
    //         });
    // }

    fetchProjects() {
        return this.http
            .get<Project[]>(this.projectDataURL)
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
}
