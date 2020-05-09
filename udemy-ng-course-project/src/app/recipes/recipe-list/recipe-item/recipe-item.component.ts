import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

// changing this to set-through-routing instead of set-from-outside 
//    will break all the property binding!
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void {
  }
}
// export class RecipeItemComponent implements OnInit {
//   @Input() recipe: Recipe;

//   constructor(private recipeService: RecipeService) { }

//   ngOnInit(): void {
//   }
  
//   loadRecipeDetail() {
//     this.recipeService.recipeSelected.emit(this.recipe);
//   }
// }
