import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmintipoemprendePage } from './admintipoemprende.page';

const routes: Routes = [
  {
    path: '',
    component: AdmintipoemprendePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmintipoemprendePageRoutingModule {}
