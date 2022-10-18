import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmprendedoresPageRoutingModule } from './emprendedores-routing.module';

import { EmprendedoresPage } from './emprendedores.page';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EmprendedoresPageRoutingModule
  ],
  declarations: [EmprendedoresPage]
})
export class EmprendedoresPageModule {}
