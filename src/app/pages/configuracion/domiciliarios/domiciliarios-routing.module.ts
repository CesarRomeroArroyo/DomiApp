import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomiciliariosPage } from './domiciliarios.page';

const routes: Routes = [
  {
    path: '',
    component: DomiciliariosPage
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'vehiculos-domiciliario',
    loadChildren: () => import('./vehiculos-domiciliario/vehiculos-domiciliario.module').then( m => m.VehiculosDomiciliarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomiciliariosPageRoutingModule {}
