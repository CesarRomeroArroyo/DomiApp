import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { Configuracion } from "src/app/core/models/configuracionModel";
import { UsuarioModel } from "src/app/core/models/usuarioModel";
import { ContextService } from "src/app/core/services/context.service";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { ProxyService } from "src/app/core/services/proxy.service";
import { EmprendedoresModel } from "../../../../core/models/emprendedoresModel";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: "app-admin-generales",
  templateUrl: "./admin-generales.page.html",
  styleUrls: ["./admin-generales.page.scss"],
})
export class AdminGeneralesPage implements OnInit {
  user: UsuarioModel;
  general: any = [];
  forma_asignacion_domicilio: any = [];
  filtrado_pago_domiciliarios: any = [];
  forma_pago_domiciliario: any = [];
  pago_emprendedor: any = [];

  constructor(
    private contextService: ContextService,
    private proxyService: ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.obtenerConfiguracion();
  } 

  ionViewWillEnter() {
    this.obtenerConfiguracion();
  }

  async obtenerConfiguracion() {
    const loading = await this.loadingController.create({      
      message: 'Obteniendo datos de Configuracion...'      
    });
    await loading.present();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.forma_asignacion_domicilio = await this.proxyService.getMethod("list/general/domicilios_asignacion/");    
    this.filtrado_pago_domiciliarios = await this.proxyService.getMethod("list/general/domicilios_pagos/");
    this.forma_pago_domiciliario = await this.proxyService.getMethod("list/general/domicilios_domiciarios_pagos/");
    this.pago_emprendedor = await this.proxyService.getMethod("list/general/domicilios_emprendedor_pagos/");
    const cocnfigGnrl: any = await this.proxyService.getMethod("list/configuracion/");
    this.general = (cocnfigGnrl.length > 0?cocnfigGnrl[0]:{});    
    await loading.dismiss();
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea guardar los datos de la configuracion?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {
            
          },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: () => {
            this.guardarDatos();
          },
        },
      ],
    });
    await alert.present();
  }

  async guardarDatos() {
    const verConfigGnrl: any = await this.proxyService.getMethod("list/configuracion/");
    this.general.cliente = this.user.codigo;
    if (verConfigGnrl.length > 0) {
      this.proxyService.putMethod("update/configuracion/", this.general);
    } else {
      this.proxyService.postMethod("save/configuracion/", this.general);
    }
    

    const toast = await this.toastController.create({
      message: "Datos Guardados Correctamente",
      duration: 3000,
      color: "success",
    });
    toast.present();
    
  }
}