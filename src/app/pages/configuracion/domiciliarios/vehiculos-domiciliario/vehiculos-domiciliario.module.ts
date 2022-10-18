import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculosDomiciliarioPageRoutingModule } from './vehiculos-domiciliario-routing.module';

import { VehiculosDomiciliarioPage } from './vehiculos-domiciliario.page';
import { ComponentsModule } from '../../../../core/components/components.module';
import { MapperVehiculosPipe } from 'src/app/core/pipe/mapper-vehiculos.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VehiculosDomiciliarioPageRoutingModule
  ],
  declarations: [VehiculosDomiciliarioPage, MapperVehiculosPipe],
  exports:[VehiculosDomiciliarioPage]
})
export class VehiculosDomiciliarioPageModule {}
