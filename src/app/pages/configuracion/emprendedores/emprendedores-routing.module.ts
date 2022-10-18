import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmprendedoresPage } from './emprendedores.page';

const routes: Routes = [
  {
    path: '',
    component: EmprendedoresPage
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprendedoresPageRoutingModule {}
