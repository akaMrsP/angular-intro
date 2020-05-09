import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopListService } from '../shop-list/shop-list.service';

@Injectable ({providedIn: 'root'})

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meat', 1, 'patty'),
                new Ingredient('French Fries', 20, 'fries')
            ]),
        new Recipe(
            'Big Fat Burger',
            'What else do you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2, 'slices'),
                new Ingredient('Meat', 1, 'patty')
            ]),
    ];

    constructor(private shopListService: ShopListService) {}

    getRecipes() {
        // return a *copy* of the recipe array!
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        // get the recipe by index - not a deep copy, so is okay
        return this.recipes[index];
        // alternately, get a *copy* of the recipe by index
        // return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shopListService.addIngredients(ingredients);
    }
}
