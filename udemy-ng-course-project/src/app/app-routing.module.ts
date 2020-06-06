import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, 
    { path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent },
        {path: 'new', component: RecipeEditComponent },
        {
            path: ':id', 
            component: RecipeDetailComponent, 
            resolve: [RecipesResolverService]       // connecting the recipe-resolver service to the app
        },                                          // so we can refresh the app on any page (data loaded or no)
        {
            path: ':id/edit', 
            component: RecipeEditComponent, 
            resolve: [RecipesResolverService] 
        }

    ] }, 
    { path: 'shopping-list', component: ShopListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {



}