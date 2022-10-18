import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCancelarDomicilioPageRoutingModule } from './modal-cancelar-domicilio-routing.module';

import { ModalCancelarDomicilioPage } from './modal-cancelar-domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCancelarDomicilioPageRoutingModule
  ],
  declarations: [ModalCancelarDomicilioPage]
})
export class ModalCancelarDomicilioPageModule {}
