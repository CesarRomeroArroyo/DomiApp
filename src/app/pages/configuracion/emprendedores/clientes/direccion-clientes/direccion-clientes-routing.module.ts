import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionClientesPage } from './direccion-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionClientesPageRoutingModule {}
