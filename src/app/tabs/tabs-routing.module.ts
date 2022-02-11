import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('../accueil/accueil.module').then(m => m.AccueilPageModule)
      },
      {
        path: 'carte',
        loadChildren: () => import('../carte/carte.module').then(m => m.CartePageModule)
      },
      {
        path: 'carte/:lat/:lng/:titre',
        loadChildren: () => import('../carte/carte.module').then(m => m.CartePageModule)
      },
      {
        path: 'lieux',
        loadChildren: () => import('../lieux/lieux.module').then(m => m.LieuxPageModule)
      },
      {
        path: 'galerie',
        loadChildren: () => import('../galerie/galerie.module').then(m => m.GaleriePageModule)
      },
      {
        path: '',
        redirectTo: 'tabs/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
