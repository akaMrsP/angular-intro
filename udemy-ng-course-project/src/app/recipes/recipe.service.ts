import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopListService } from '../shop-list/shop-list.service';
import { Subject } from 'rxjs';

@Injectable ({providedIn: 'root'})

export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];     // data storage in Firebase means we don't need to hard code data storage here.
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //         [
    //             new Ingredient('Meat', 1, 'patty'),
    //             new Ingredient('French Fries', 20, 'fries')
    //         ]),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else do you need to say?',
    //         'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //         [
    //             new Ingredient('Buns', 2, 'slices'),
    //             new Ingredient('Meat', 1, 'patty')
    //         ]),
    // ];

    constructor(private shopListService: ShopListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
