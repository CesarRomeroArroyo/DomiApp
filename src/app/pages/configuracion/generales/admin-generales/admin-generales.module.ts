import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminGeneralesPageRoutingModule } from './admin-generales-routing.module';

import { AdminGeneralesPage } from './admin-generales.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { ModificacionEmprendedorPageModule } from '../modificacion-emprendedor/modificacion-emprendedor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AdminGeneralesPageRoutingModule,
    ModificacionEmprendedorPageModule,
  ],
  declarations: [AdminGeneralesPage]
})
export class AdminGeneralesPageModule {}
