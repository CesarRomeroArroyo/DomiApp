import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoEmprededorPage } from './tipo-emprededor.page';

const routes: Routes = [
  {
    path: '',
    component: TipoEmprededorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoEmprededorPageRoutingModule {}
