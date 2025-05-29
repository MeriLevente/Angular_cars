import { Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { VotingComponent } from './voting/voting.component';

export const routes: Routes = [
    {path: '', component: CarsComponent},
    {path: 'vote', component: VotingComponent}
];
