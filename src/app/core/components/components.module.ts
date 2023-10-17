import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconBarComponent } from './icon-bar/icon-bar.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { LinesComponent } from './lines/lines.component';
import { FabButtonComponent } from './fab-button/fab-button.component';


@NgModule({
  declarations: [
    DataTableComponent,
    IconBarComponent,
    ContentAreaComponent,
    AppTitleComponent,
    LinesComponent,
    FabButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    DataTableComponent,
    IconBarComponent,
    ContentAreaComponent,
    AppTitleComponent,
    LinesComponent,
    FabButtonComponent
  ]
})
export class ComponentsModule { }
