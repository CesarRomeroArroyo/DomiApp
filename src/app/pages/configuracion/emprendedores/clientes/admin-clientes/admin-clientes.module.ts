import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminClientesPageRoutingModule } from './admin-clientes-routing.module';

import { AdminClientesPage } from './admin-clientes.page';
import { DireccionClientesPageModule } from '../direccion-clientes/direccion-clientes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminClientesPageRoutingModule,
    DireccionClientesPageModule
  ],
  declarations: [AdminClientesPage]
})
export class AdminClientesPageModule {}
