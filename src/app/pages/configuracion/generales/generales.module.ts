import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralesPageRoutingModule } from './generales-routing.module';

import { GeneralesPage } from './generales.page';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GeneralesPageRoutingModule
  ],
  declarations: [GeneralesPage]
})
export class GeneralesPageModule {}
