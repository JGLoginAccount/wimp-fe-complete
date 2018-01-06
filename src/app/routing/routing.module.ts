import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent }   from '../movie/movie.component';
import { MovieFormComponent }   from '../movie-form/movie-form.component';
import { HomeComponent }   from '../home/home.component';
import { ActorComponent } from '../actor/actor.component';
import { MovieActorComponent } from '../movie-actor/movie-actor.component';

import { AwardFormComponent } from '../award-form/award-form.component';



import { ActorformComponent } from '../actorform/actorform.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'movie',  component: MovieComponent },
  { path: 'movie/edit/:id', component: MovieFormComponent },
  { path: 'movie/add', component: MovieFormComponent },

  { path: 'movieactor/add/:id', component: MovieActorComponent },


  { path: 'actor',  component: ActorComponent },
  { path: 'actor/edit/:id', component: ActorformComponent },
  { path: 'actor/add', component: ActorformComponent },


  { path: 'award/edit/:id', component: AwardFormComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
