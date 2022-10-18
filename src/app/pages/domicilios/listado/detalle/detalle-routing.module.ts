import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePage } from './detalle.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePage
  },
  {
    path: 'modal-cancelar-domicilio',
    loadChildren: () => import('./modal-cancelar-domicilio/modal-cancelar-domicilio.module').then( m => m.ModalCancelarDomicilioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePageRoutingModule {}
