import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminClientesPage } from './admin-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminClientesPageRoutingModule {}
