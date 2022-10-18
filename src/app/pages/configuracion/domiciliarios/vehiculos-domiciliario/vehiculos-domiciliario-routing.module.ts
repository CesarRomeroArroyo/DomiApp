import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculosDomiciliarioPage } from './vehiculos-domiciliario.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculosDomiciliarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosDomiciliarioPageRoutingModule {}
