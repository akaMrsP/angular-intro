import { Injectable } from "@angular/core";
import { Project } from './project.model';
import { ImageDetail } from './image.model';

@Injectable ({providedIn: 'root'})

export class ProjectService {

    private categories: string[] = ['education', 'healthcare', 'civic', 'industrial'];

    private projects: Project[] = 
    [
        new Project(
            'Mission Hope Cancer Treatment Center, Santa Maria, CA',
            'Pezzoni Enginering provided electrical engineering services for a three-story Advanced Cancer Treatment Center. Specialty electrical systems to serve new state-of-the-art diagnostic and treatment systems, including MRI, CT, Cyber Knife, Linear Accelerator and other technologies.',
            this.categories[1], // healthcare
            [
                new ImageDetail('Mission Hope 1', '../../assets/images/healthcare/mission-hope1.jpg', 'Mission Hope - Front'),
                new ImageDetail('Mission Hope 2', '../../assets/images/healthcare/mission-hope2.jpg', 'Mission Hope Lab')
            ]),
        new Project(
            'Oakdale Junior High School Gymnasium, Oakdale, CA',
            'Pezzoni Enginering provided electrical engineering services for a new Junior High School Gymnasium in Oakdale, CA.',
            this.categories[0], // education
            [
                new ImageDetail('Oakdale JH Gym', '../../assets/images/education/oakdale-jh.jpg', 'Oakdale JH Gymnasium')
            ])
    ];

    getProjects() {
        console.log(this.projects);
        return this.projects.slice();
    }

}