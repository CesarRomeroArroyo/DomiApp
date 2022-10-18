import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { DomiciliarioVehiculoModel } from '../../../../core/models/domiciliariosVehiculosModel';

@Component({
  selector: 'app-vehiculos-domiciliario',
  templateUrl: './vehiculos-domiciliario.page.html',
  styleUrls: ['./vehiculos-domiciliario.page.scss'],
})
export class VehiculosDomiciliarioPage implements OnInit {
  @Input() domiId:number;
  @Input() domiCliente: string;
  editar: boolean = false;
  vehiculoDomiciliario: DomiciliarioVehiculoModel;
  public columns: Array<any> = [];
  public data: any;

  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.columns = [
      { title: "Placa", name: "placa" },
      { title: "Modelo", name: "modelo" },
      { title: "Marca", name: "marca" },
      { title: "Tarjeta Propiedad", name: "tarjeta_propiedad" },
      { title: "Principal", name: "principal" },
    ];
    this.vehiculoDomiciliario = new DomiciliarioVehiculoModel();
    this.fetchDomiciliarioVehiculos(this.domiId);
  }

  ionViewDidEnter() {
    this.columns = [
      { title: "Placa", name: "placa" },
      { title: "Modelo", name: "modelo" },
      { title: "Marca", name: "marca" },
      { title: "Tarjeta Propiedad", name: "tarjeta_propiedad" },
      { title: "Principal", name: "principal" },
    ];
    this.fetchDomiciliarioVehiculos(this.domiId);
  }

  async fetchDomiciliarioVehiculos(domiId: number) {
    this.data = await this.proxyService.getMethod(`vehiculosdomiciliarios/${domiId}`);
    const todos = await this.proxyService.getMethod('list/domiciliarios_vehiculos/');
  }

  async guardarVehiculo() {
    this.vehiculoDomiciliario.cliente = this.domiCliente;
    this.vehiculoDomiciliario.iddomiciliario = this.domiId;
    this.proxyService.postMethod("save/domiciliarios_vehiculos/", this.vehiculoDomiciliario);
    this.fetchDomiciliarioVehiculos(this.domiId);
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea guardar los datos del vehiculo del domiciliario?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {
            this.router.navigate(["dashboard", "admindomiciliario"]);
          },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: () => {
            this.guardarVehiculo();
            this.limpiarCampos();
          },
        },
      ],
    });
    await alert.present();
  }

  async delete(vehiculoDomiciliario: any) {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea eliminar el vehiculo del domiciliario?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {},
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: async () => {
            await this.proxyService.deleteMethod("delete/domiciliarios_vehiculos", vehiculoDomiciliario.id);
            this.fetchDomiciliarioVehiculos(this.domiId);
          },
        },
      ],
    });
    await alert.present();
  }

  gotoEdit(vehiculoDomiciliario: any) {
    this.editar = true;
    this.vehiculoDomiciliario = vehiculoDomiciliario;
  }

  async editarVehiculosDomiciliario() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea editar el vehiculo del domiciliario?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {},
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: () => {
            this.proxyService.putMethod("update/domiciliarios_vehiculos/", this.vehiculoDomiciliario);
            this.fetchDomiciliarioVehiculos(this.domiId);
            this.cancelar();
          },
        },
      ],
    });
    await alert.present();
  }

  isEdit() {
    return this.editar;
  }

  cancelar() {
    this.editar = false;
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.vehiculoDomiciliario = new DomiciliarioVehiculoModel();
    this.fetchDomiciliarioVehiculos(this.domiId);
  }
}