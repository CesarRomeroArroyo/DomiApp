import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { MapperCategoriaPipe } from 'src/app/core/pipe/mapper-categorias.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ComponentsModule  
  ],
  declarations: [ProductosPage, MapperCategoriaPipe],
})
export class ProductosPageModule {}
