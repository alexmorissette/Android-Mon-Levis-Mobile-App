import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Erreur404Page } from './erreur404.page';

const routes: Routes = [
  {
    path: '',
    component: Erreur404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Erreur404PageRoutingModule {}
