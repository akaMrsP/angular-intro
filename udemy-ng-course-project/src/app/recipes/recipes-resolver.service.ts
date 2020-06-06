import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';


@Injectable({providedIn: 'root'})

  // we need some sort of guard to prevent refresh errors, because no data is initially loaded!
  // Like this resolver (as a guard)
  export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService,
                private recipesService: RecipeService) {}

    // resolve methodd forced by the implements Resolve
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipesService.getRecipes();

        // need to either return the array of recipes (can't if refresh - because recipes are not loaded yet)
        // or an observable that will yield an array of recipes

        // Uh-oh!  This overwrites any edits we make!  Better add a check to make sure we only fetch if nothing is currently here.
      // return this.dataStorageService.fetchRecipes();  // not subscribing here because the resolve method (angular feature) subscribes for me!
      if (recipes.length === 0) {   // no recipes loaded - safe to fetch
        return this.dataStorageService.fetchRecipes();  // not subscribing here because the resolve method (angular feature) subscribes for me!
      } else {    // recipes are already here - do NOT overwrite them!
        return recipes;
      }
    }
  }