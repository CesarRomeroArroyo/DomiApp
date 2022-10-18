import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionClientesPageRoutingModule } from './direccion-clientes-routing.module';
import { DireccionClientesPage } from './direccion-clientes.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { MapperDireccionesPipe } from '../../../../../core/pipe/mapper-direcciones.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DireccionClientesPageRoutingModule
  ],
  declarations: [DireccionClientesPage, MapperDireccionesPipe],
  exports:[DireccionClientesPage]
})
export class DireccionClientesPageModule {}
