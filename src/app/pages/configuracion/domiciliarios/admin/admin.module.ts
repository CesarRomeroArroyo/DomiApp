import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { VehiculosDomiciliarioPageModule } from '../vehiculos-domiciliario/vehiculos-domiciliario.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    VehiculosDomiciliarioPageModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
