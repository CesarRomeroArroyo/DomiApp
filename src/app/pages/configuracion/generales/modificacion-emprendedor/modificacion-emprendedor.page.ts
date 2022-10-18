import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { EmprendedoresModel } from "src/app/core/models/emprendedoresModel";
import { ContextService } from "src/app/core/services/context.service";
import { ProxyService } from "../../../../core/services/proxy.service";
import { Configuracion } from "../../../../core/models/configuracionModel";

@Component({
  selector: "app-modificacion-emprendedor",
  templateUrl: "./modificacion-emprendedor.page.html",
  styleUrls: ["./modificacion-emprendedor.page.scss"],
})
export class ModificacionEmprendedorPage implements OnInit {
  @Input() general: Configuracion;

  editar: boolean = false;
  emprendedor: EmprendedoresModel;
  data: any;
  listado: any;

  constructor(
    private proxyService: ProxyService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.emprendedor = new EmprendedoresModel();
    this.fetchEmprendedores();
  }

  async fetchEmprendedores() {
    this.data = await this.proxyService.getMethod("list/emprendedores/");
    this.listado = this.data;
  }

  async guardar(item) {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea Guardar los cambios en el Emprendedor?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: async () => {
            await this.fetchEmprendedores();
          },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: async () => {
            await this.proxyService.putMethod("update/emprendedores/", item);
            await this.fetchEmprendedores();
          },
        },
      ],
    });
    await alert.present();
  }
}
