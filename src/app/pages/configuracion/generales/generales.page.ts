import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Configuracion } from 'src/app/core/models/configuracionModel';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: "app-generales",
  templateUrl: "./generales.page.html",
  styleUrls: ["./generales.page.scss"],
})
export class GeneralesPage implements OnInit {
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
      {
        title: "Forma asignacion domicilio",
        name: "forma_asignacion_domicilio",
      },
      { title: "Pago del emprendedor", name: "pago_del_emprendedor" },
      { title: "Valor pago emprendedor", name: "valor_pago_emprendedor" },
      { title: "Pago domiciliario", name: "pago_domiciliario" },
      { title: "Valor pago domiciliario", name: "valor_pago_domiciliario" },
      { title: "Forma pago domiciliario", name: "forma_pago_domiciliario" },
    ];
    this.buscarGenerales();
    this.contextService.data = new Configuracion();
  }

  ionViewDidEnter() {
    this.columns = [
      {
        title: "Forma asignacion domicilio",
        name: "forma_asignacion_domicilio",
      },
      { title: "Pago del emprendedor", name: "pago_del_emprendedor" },
      { title: "Valor pago emprendedor", name: "valor_pago_emprendedor" },
      { title: "Pago domiciliario", name: "pago_domiciliario" },
      { title: "Valor pago domiciliario", name: "valor_pago_domiciliario" },
      { title: "Forma pago domiciliario", name: "forma_pago_domiciliario" },
    ];
    this.buscarGenerales();
    this.contextService.data = new Configuracion();
  }

  async buscarGenerales() {
    this.data = await this.proxyService.getMethod("list/configuracion/");
  }

  async mensaje() {
    const alert = await this.alertController.create({
      header: 'No se pueden crear mas configuraciones',
      message: 'Ya existe una previa configuracion.',
      buttons: ['OK']
    });
    await alert.present();
  }


  gotToNew() {
    this.contextService.data = new Configuracion();
    if (this.data.length > 0) {
      this.mensaje();
    } else {
      this.router.navigate(["dashboard", "admingenerales"]);
    }
  }

  gotoEdit(general: any) {
    this.contextService.data = general;
    this.router.navigate(["dashboard", "admingenerales"]);
  }

  async delete(general: any) {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea eliminar la configuracion?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => { },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: async () => {
            await this.proxyService.deleteMethod("delete/configuracion", general.id);
            this.data = await this.proxyService.getMethod("list/configuracion/");
          },
        },
      ],
    });
    await alert.present();
  }
}