import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClientesModel } from 'src/app/core/models/clientesModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import * as uuid from 'uuid';
import { ClientesDireccionesModel } from '../../../../../core/models/clientesDireccionesModel';


@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.page.html',
  styleUrls: ['./admin-clientes.page.scss'],
})
export class AdminClientesPage implements OnInit {
  cliente: ClientesModel;
  clienteDireccionData: any;
  clienteDireccion: ClientesDireccionesModel;
  edit = false;
  user: any;
  usuario: UsuarioModel;
  idunico = uuid.v4();

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
    this.clienteDireccion = new ClientesDireccionesModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.cliente = this.contextService.data;
    this.cargarCamposCD(this.cliente.id);
    if (this.cliente.num_ide != "") {
      this.edit = true;
    }
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.cliente = this.contextService.data;
    this.cargarCamposCD(this.cliente.id);
    if (this.cliente.num_ide != "") {
      this.edit = true;
    }
  }

  async fetchClienteDirecciones(clienteId: number) {
    const getDireccion: any = await this.proxyService.getMethod(`clientedireccion/${clienteId}`);
    return getDireccion
  }

  async cargarCamposCD(clienteId: number) {
    const getDirecciones: any = await this.fetchClienteDirecciones(clienteId);
    if (getDirecciones.length > 0) {
      this.clienteDireccion = getDirecciones[0];
    }
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos del cliente?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard', 'emprendedores', 'clientes']);
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
    this.cliente.cliente = this.user.codigo;
    this.cliente.idunico = this.idunico;
    this.cliente.idemprendedor = this.user.iduser;
    if (this.edit) {
      this.proxyService.putMethod('update/clientes/', this.cliente);
      this.clienteDireccionData = await this.fetchClienteDirecciones(this.cliente.id);
      this.clienteDireccion.idcliente = this.cliente.id;
      this.clienteDireccion.cliente = this.cliente.cliente;
      if (this.clienteDireccionData.length > 0) {
        this.proxyService.putMethod('update/clientes_direcciones/', this.clienteDireccion);
      } else {
        this.proxyService.postMethod('save/clientes_direcciones/', this.clienteDireccion);
      }
    }
    else {
      this.proxyService.postMethod('save/clientes/', this.cliente);
    }

    this.contextService.data = new ClientesModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard', 'emprendedores', 'clientes']);
  }
}


