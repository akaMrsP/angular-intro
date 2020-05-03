import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // localhost:4200
  // AuthGuard means servers is only accessable if canActivate in the AuthGuard returns true (when auth service loggedIn is true)
  //    canActivate works on the path it is on and all children of that path
  { 
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent, 
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', canDeactivate: [CanDeactivateGuard], component: EditServerComponent }
    ] 
  },  // localhost:4200/servers with children: <id> and <id>/edit
  // load the component with a dynamic path segment
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },  // localhost:4200/users with child: <id>/<name>
  // { path: 'not-found', component: PageNotFoundComponent },  // component loads a specific component
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },  // data: passes static data to the component
  // { path: 'something', redirectTo: '/not-found' },   // redirectTo redirects to a specific path
  { path: '**', redirectTo: '/not-found' }   // This ** "catch-all" MUST be the last line, because it catches anything not already checked
];

@NgModule({
  // appRoutes are the routes themselves
  // hash is the configuration of the routes (default is false)
  //    hash is needed if your production server doesn't allow angular to handle 404 errors
  //    routes are cleaner without it, if you can get away with it
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
