import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../../core/components/components.module';
import { ModificacionEmprendedorPage } from './modificacion-emprendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ],
  declarations: [ModificacionEmprendedorPage],
  exports: [ModificacionEmprendedorPage]
})
export class ModificacionEmprendedorPageModule {}
