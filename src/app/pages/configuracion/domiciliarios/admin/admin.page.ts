import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { DomiciliarioModel } from 'src/app/core/models/domiciliariosModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import {Md5} from 'ts-md5/dist/md5';
import * as uuid from 'uuid';
import { DomiciliarioVehiculoModel } from '../../../../core/models/domiciliariosVehiculosModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  domi: DomiciliarioModel;
  domiVehiculoData: any;
  domiVehiculo: DomiciliarioVehiculoModel;
  edit = false;
  user: any;
  usuario: UsuarioModel;
  idunico = "";
  constructor(
    private contextService: ContextService, 
    private proxyService: ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.idunico = uuid.v4();
  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.domiVehiculo = new DomiciliarioVehiculoModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = this.contextService.data;
    this.cargarCamposDV(this.domi.id);
    if(this.domi.num_ide != ""){
      this.edit = true;
    }

  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = this.contextService.data;
    this.cargarCamposDV(this.domi.id);
    if(this.domi.num_ide != ""){
      this.edit = true;
    }
  }

  async fetchDomiciliarioVehiculos(domiId: number) {
    const getVehiculo: any = await this.proxyService.getMethod(`domiciliarioVehiculo/${domiId}`);
    return getVehiculo
  }

  async cargarCamposDV(domiId: number) {
    const getVehiculos: any = await this.fetchDomiciliarioVehiculos(domiId);
    if (getVehiculos.length > 0) {
      this.domiVehiculo = getVehiculos[0];
    }
  }

  async confirmarGuardado(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos del Domiciliario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard','domiciliarios']);
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

  async guardarDatos(){
    this.domi.cliente = this.user.codigo;
    if(this.edit){      
      this.proxyService.putMethod('update/domiciliarios/', this.domi);
      this.domiVehiculoData = await this.fetchDomiciliarioVehiculos(this.domi.id)
      this.domiVehiculo.iddomiciliario = this.domi.id;
      this.domiVehiculo.cliente = this.domi.cliente;
      if (this.domiVehiculoData.length > 0) {
        this.proxyService.putMethod('update/domiciliarios_vehiculos/', this.domiVehiculo);
      } else {
        this.proxyService.postMethod('save/domiciliarios_vehiculos/', this.domiVehiculo);
      }
    } else {
      this.domi.idunico = this.idunico;
      this.usuario.idunico = this.idunico;
      this.cargarUsuario();
      this.proxyService.postMethod('save/domiciliarios/', this.domi);
      this.proxyService.postMethod('save_sgi/usuario/', this.usuario);
    }
    this.contextService.data = new DomiciliarioModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard','domiciliarios']);
  }

  cargarUsuario(){
    const md5 = new Md5();
    this.usuario.user = this.domi.usuario;
    this.usuario.pass = md5.appendStr(this.domi.password).end().toString();
    this.usuario.permisos = '3';
    this.usuario.Nombre = this.domi.nombre;
    this.usuario.codigo = this.domi.cliente;
    this.usuario.activo = '1';
    this.usuario.email = this.domi.email;
    this.usuario.per = '3';
    this.usuario.token = '123';
    this.usuario.aplicacion = this.user.aplicacion;
    this.usuario.basededatos = this.user.basededatos;
    
  }
}