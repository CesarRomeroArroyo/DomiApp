import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModificacionEmprendedorPage } from './modificacion-emprendedor.page';

const routes: Routes = [
  {
    path: '',
    component: ModificacionEmprendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificacionEmprendedorPageRoutingModule {}
