import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { TipoEmprendedoresModel } from 'src/app/core/models/tipoEmprendedoresModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-admintipoemprende',
  templateUrl: './admintipoemprende.page.html',
  styleUrls: ['./admintipoemprende.page.scss'],
})
export class AdmintipoemprendePage implements OnInit {
  emprendedor: TipoEmprendedoresModel;
  user: any;
  edit = false;
  constructor(
    private contextService: ContextService,
    private proxyService: ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.emprendedor = new TipoEmprendedoresModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.emprendedor = this.contextService.data;
    if (this.emprendedor.nombre != "") {
      this.edit = true;
    }
  }

  ionViewWillEnter() {
    this.emprendedor = new TipoEmprendedoresModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.emprendedor = this.contextService.data;
    if (this.emprendedor.nombre != "") {
      this.edit = true;
    }
  }

  async guardarDatos() {
    this.emprendedor.cliente = this.user.codigo;
    if (this.edit) {
      this.proxyService.putMethod('update/emprendedores_tipo/', this.emprendedor);
    } else {
      this.proxyService.postMethod('save/emprendedores_tipo/', this.emprendedor);
    }
    this.contextService.data = new TipoEmprendedoresModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard', 'tipo-emprededor']);
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos del tipo de Emprendedor?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard', 'tipo-emprededor']);
          }
        }, {
          text: 'Si',
          id: 'confirm-button',
          cssClass: 'success',
          handler: () => {
            this.guardarDatos();
          }
        }
      ]
    });
    await alert.present();
  }

}
