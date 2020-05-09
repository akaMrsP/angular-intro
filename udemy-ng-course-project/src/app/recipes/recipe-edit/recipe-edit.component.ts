import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  // Angular will clean up the observables for us - 
  //  don't forget to clean up our own *custom* observables, if we have any
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // are we in edit mode?  
            // check to see if 'id' exists - edit mode
            // else - new mode
          this.editMode = params['id'] != null;
          // console.log(this.editMode);
        }
      );
  }

}
