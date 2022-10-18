import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPage } from './listado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPage
  },
  {
    path: 'detalle-list',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPageRoutingModule {}
