import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProxyInterceptorService } from './core/interceptors/proxy-interceptor.service';
import { DataTableComponent } from './core/components/data-table/data-table.component';
import { MapperVehiculosPipe } from './core/pipe/mapper-vehiculos.pipe';
import { MapperDireccionesPipe } from './core/pipe/mapper-direcciones.pipe';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
