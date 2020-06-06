import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';


// Injecting a service into another service, so I need:
@Injectable({providedIn: 'root'})

// Could put the HTTP interaction in nav (where the buttons are), 
//  or in the recipe service file (where the recipe data is),
//  or in this service file - dedicated to the task of HTTP requests for data storage!
export class DataStorageService {
        // the .json on the end is a Firebase characteristic and required at the end of the URL
        // the /recipes is how the Firebase REST API works, requiring us to define our own nodes 
                    // (which become the folders where the data is stored)
    recipeDataURL = 'https://ng-course-recipe-book-c032c.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    // storeRecipes(recipes: Recipe[]) {   // Could pass in the recipes to be stored
    storeRecipes() {                    // or avoid the extra argument by injecting the service instead
        const recipes = this.recipeService.getRecipes();
        // this.http.post  // for one recipe (firebase specific - always check the API!) - POST (single) Firebase will generate a unique ID for you.
        // Use PUT for an array of recipes - will overwrite existing! (firebase specific - always check the API!)
        // return this.http.put(recipeDataURL, recipes);     // if you wish to subscribe elsewhere, you must return (maybe you want a loading spinner?)
        this.http
            .put(this.recipeDataURL, recipes)    // PUT (multiple) - Firebase will NOT generate a unique ID for you, create your own!
            .subscribe(response => {                                                       // we will just use the array indices.
                console.log(response);
            });     // subscribing here instead, because we have no interest in the service elsewhere

    }

    // We need at least an empty array of ingredients to avoid introducing bugs (won't be able to interact with data without errors!)
    fetchRecipes() {
        return this.http
            .get<Recipe[]>(this.recipeDataURL)
            .pipe(
                map(recipes => {      // This map is an rxjs operator (not the same as the map in the line below)
                    return recipes.map(recipe => {      // using tertiary operator to check if there are ingredients or not
                        return {
                            ...recipe, 
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };  // if no ingredients, create an empty array
                    });   // This map is the normal js map method for an array (called on an array)
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
            // This subscription will take place in the recipes-resolver service instead
            // .subscribe(recipes => {     // ts does not understand that recipes is an array, add the info to GET
            //     // console.log(recipes);
            //     this.recipeService.setRecipes(recipes);     // forward the recipes to the recipe service.
            // });   // where do we want to subscribe???  A. Where are we interested in the response?
    }
}