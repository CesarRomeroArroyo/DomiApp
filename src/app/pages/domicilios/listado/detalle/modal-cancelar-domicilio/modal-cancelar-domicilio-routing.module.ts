import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCancelarDomicilioPage } from './modal-cancelar-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCancelarDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCancelarDomicilioPageRoutingModule {}
