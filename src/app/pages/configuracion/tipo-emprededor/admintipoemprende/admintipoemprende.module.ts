import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmintipoemprendePageRoutingModule } from './admintipoemprende-routing.module';

import { AdmintipoemprendePage } from './admintipoemprende.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmintipoemprendePageRoutingModule
  ],
  declarations: [AdmintipoemprendePage]
})
export class AdmintipoemprendePageModule {}
