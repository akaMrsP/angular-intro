import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  categorySelected = 'healthcare';
  projects: Project[];

  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) {          
  }
  
  ngOnInit(): void {

    if (!this.projectService.isInitialized()) {
        this.router.navigate(['home', {relativeTo: this.route}]);
    }

    this.route.params
      .subscribe(
        (params: Params) => {
          this.categorySelected = params['category'];
          this.projects = this.projectService.getProjects(this.categorySelected);
        }
      );

      window.scrollTo(0,0);   // make sure we are seeing the gallery from the top of the page
  }

  onSelect(category: string) {
    this.categorySelected = category;
  }

}
