import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoPage } from './historico.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoPageRoutingModule {}
