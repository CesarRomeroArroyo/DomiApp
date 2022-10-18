import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralesPage } from './generales.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralesPage
  },
  {
    path: 'admin-generales',
    loadChildren: () => import('./admin-generales/admin-generales.module').then( m => m.AdminGeneralesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralesPageRoutingModule {}
