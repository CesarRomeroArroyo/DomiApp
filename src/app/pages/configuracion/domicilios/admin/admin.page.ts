import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DomiciliosModel } from 'src/app/core/models/domiciliosModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  domi: DomiciliosModel;
  edit = false;
  user: any;
  usuario: UsuarioModel;
  public ids = [1];
  public ids1 = [1, 2, 3, 4, 5];
  public dataEmmprendedor: any;
  public dataCliente: any;
  public dataTipoEmprendedor: any;
  public dataDireccion: any;
  public dataDomiciliario: any;
  public ids_domi: number[] = [];

  constructor(
    private contextService: ContextService,
    private proxyService: ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = this.contextService.data;
    if (this.domi.descripcion != "") {
      this.edit = true;
    }
    this.getDataDomiciliario();
    this.getDataCliente();
    this.getDataDireccion();
    this.getDataEmmprendedor();
    this.getTipoEmprendedor();
  }

  async getDataDomiciliario() {
    this.dataDomiciliario = await this.proxyService.getMethod("list/domiciliarios/");
  }

  async getDataEmmprendedor() {
    this.dataEmmprendedor = await this.proxyService.getMethod("list/emprendedores/");
  }

  async getDataCliente() {
    this.dataCliente = await this.proxyService.getMethod("list/clientes/");
  }

  async getDataDireccion() {
    this.dataDireccion = await this.proxyService.getMethod("list/clientes_direcciones/");
  }

  async getTipoEmprendedor() {
    this.dataTipoEmprendedor = await this.proxyService.getMethod("list/tipo_emprendedor/");
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = this.contextService.data;
    if (this.domi.descripcion != "") {
      this.edit = true;
    }
    this.getDataDomiciliario();
    this.getDataCliente();
    this.getDataDireccion();
    this.getDataEmmprendedor();
    this.getTipoEmprendedor();
  }

  set clickOption(optionValue: string) {
    console.log(optionValue);
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos del Domicilio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard', 'domicilios']);
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

  async guardarDatos() {
    this.domi.cliente = this.user.codigo;
    if (this.edit) {
      this.proxyService.putMethod('update/domicilios/', this.domi);
    } else {
      this.proxyService.postMethod('save/domicilios/', this.domi);
    }
    this.contextService.data = new DomiciliosModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard', 'domicilios']);
  }

}

