import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://storage.needpix.com/rsynced_images/recipes-2920064_1280.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://storage.needpix.com/rsynced_images/recipes-2920064_1280.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected ( selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
  }
}
