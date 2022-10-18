import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoEmprededorPageRoutingModule } from './tipo-emprededor-routing.module';

import { TipoEmprededorPage } from './tipo-emprededor.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TipoEmprededorPageRoutingModule
  ],
  declarations: [TipoEmprededorPage]
})
export class TipoEmprededorPageModule {}
