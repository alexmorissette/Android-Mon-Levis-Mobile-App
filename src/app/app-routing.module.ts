import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lieux',
    loadChildren: () => import('./lieux/lieux.module').then(m => m.LieuxPageModule)
  },
  {
    path: 'lieux/:urlLieu',
    loadChildren: () => import('./lieux/lieux.module').then(m => m.LieuxPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./erreur404/erreur404.module').then( m => m.Erreur404PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
