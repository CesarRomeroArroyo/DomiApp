import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliariosPageRoutingModule } from './domiciliarios-routing.module';

import { DomiciliariosPage } from './domiciliarios.page';
import { DataTableComponent } from 'src/app/core/components/data-table/data-table.component';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DomiciliariosPageRoutingModule
  ],
  declarations: [DomiciliariosPage]
})
export class DomiciliariosPageModule {}
