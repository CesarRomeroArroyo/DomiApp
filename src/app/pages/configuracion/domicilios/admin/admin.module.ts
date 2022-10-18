import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { IdpipePipe } from 'src/app/core/pipes/idpipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage,IdpipePipe]
})
export class AdminPageModule {}
