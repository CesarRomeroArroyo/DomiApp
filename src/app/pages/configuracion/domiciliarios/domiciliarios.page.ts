import { Component, OnInit } from '@angular/core';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DomiciliarioModel } from 'src/app/core/models/domiciliariosModel';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-domiciliarios',
  templateUrl: './domiciliarios.page.html',
  styleUrls: ['./domiciliarios.page.scss'],
})
export class DomiciliariosPage implements OnInit {
  public data: any;
  public columns: Array<any> = [];
  showModal = false;
  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private contextService: ContextService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.columns = [
      { title: 'Nombre', name: 'nombre' },
      { title: 'Identificacion', name: 'num_ide' },
      { title: 'Telefono', name: 'telefono' },
      { title: 'Email', name: 'email' },
    ];
    this.buscarDomiciliarios();
    this.contextService.data = new DomiciliarioModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: 'Nombre', name: 'nombre' },
      { title: 'Identificacion', name: 'num_ide' },
      { title: 'Telefono', name: 'telefono' },
      { title: 'Email', name: 'email' },
    ];
    this.buscarDomiciliarios();
    this.contextService.data = new DomiciliarioModel();
  }

  async buscarDomiciliarios() {
    this.data = await this.proxyService.getMethod("list/domiciliarios/");
  }

  gotToNew() {
    this.contextService.data = new DomiciliarioModel();
    this.router.navigate(['dashboard', 'admindomiciliario']);
  }

  gotoEdit(domi: any) {
    this.contextService.data = domi;
    this.router.navigate(['dashboard', 'admindomiciliario']);
  }

  async delete(domi: any) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar el Domiciliario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {

          }
        }, {
          text: 'Si',
          id: 'confirm-button',
          cssClass: 'success',
          handler: async () => {
            await this.proxyService.deleteMethod("delete/domiciliarios", domi.id);
            this.data = await this.proxyService.getMethod("list/domiciliarios/");
            this.eliminarVehiculosDomiciliarios(domi.id);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarVehiculosDomiciliarios(idDomiciliario) {
    const getVehiculo: any = await this.proxyService.getMethod(`vehiculosdomiciliarios/${idDomiciliario}`);
    if (getVehiculo.length > 0) {
      await this.proxyService.deleteMethod("eliminarVehiculosXDomiciliario", idDomiciliario);
    } 
  }
}
