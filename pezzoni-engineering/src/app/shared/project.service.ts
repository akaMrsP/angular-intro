import { Injectable } from "@angular/core";
import { Project } from './project.model';

@Injectable ({providedIn: 'root'})

export class ProjectService {

    // private categories: string[] = ['education', 'healthcare', 'civic', 'industrial'];

    private projects: Project[] = [];

    private initializedStatus = false;

    getProjects(requestedCategory: string) {

        let selectedProjects = [];

        // No category - grab them all - else grab just projects in that category
        if (requestedCategory === '') {
            selectedProjects = this.projects;
        }
        else {
            selectedProjects = this.projects
                .filter(function(obj) {
                    return obj.category === requestedCategory;
                })
                .map(function(obj) {
                    return obj;
                });
        }

        return selectedProjects;
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
        this.initializedStatus = true;
    }

    isInitialized() {
        return this.initializedStatus;
    }
}
