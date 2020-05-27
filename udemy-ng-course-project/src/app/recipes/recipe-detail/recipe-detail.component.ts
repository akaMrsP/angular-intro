// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

// component moves from set-by-outside to set-through routing!
//    This breaks all the property binding!
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeDetail: Recipe;
  recipeDetail: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    // only works for the first time we load the component
    // const id = this.route.snapshot.params['id'];

    // so subscribe instead!  
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeDetail = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }

  onEditRecipe() {
    // don't need id, because we are using a relative path!
    this.router.navigate(['edit'], {relativeTo: this.route});
    // Alternatively, we can pass all the segments - don't forget relativeTo!!!
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
