import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: 'admin-clientes',
    loadChildren: () => import('./admin-clientes/admin-clientes.module').then( m => m.AdminClientesPageModule)
  },
  {
    path: 'direccion-clientes',
    loadChildren: () => import('./direccion-clientes/direccion-clientes.module').then( m => m.DireccionClientesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
