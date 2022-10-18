import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { EmprendedoresModel } from '../../../../core/models/emprendedoresModel';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  longitud: string;
  latitud: string;
  emprendedor: EmprendedoresModel;
  edit = false;
  user: any;
  usuario: UsuarioModel;
  idunico = uuid.v4();
  tipos: any;
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
    this.buscarTipos();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.emprendedor = this.contextService.data;
    console.log(this.emprendedor);
    
    if (this.emprendedor.num_ide != "") {
      this.edit = true;
    }
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.buscarTipos();
    this.emprendedor = this.contextService.data;
    if (this.emprendedor.num_ide != "") {
      this.edit = true;
    }
  }

  async buscarTipos(){
    this.tipos = await this.proxyService.getMethod("list/emprendedores_tipo/");
  }

  async guardarDatos() {
    this.emprendedor.cliente = this.user.codigo;
    this.emprendedor.lat = this.latitud;
    this.emprendedor.lon = this.longitud;

    if (this.edit) {
      this.proxyService.putMethod('update/emprendedores/', this.emprendedor);
    } else {
      this.emprendedor.idunico = this.idunico;
      this.cargarUsuario();
      this.proxyService.postMethod('save/emprendedores/', this.emprendedor);
      this.proxyService.postMethod('save_sgi/usuario/', this.usuario);
    }
    this.contextService.data = new EmprendedoresModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard', 'emprendedores']);
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos del Emprendedor?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard', 'emprendedores']);
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

  cargarUsuario() {
    const md5 = new Md5();
    this.usuario.permisos = '2';
    this.usuario.user = this.emprendedor.usuario;
    this.usuario.pass = md5.appendStr(this.emprendedor.password).end().toString();
    this.usuario.Nombre = this.emprendedor.nombre;
    this.usuario.codigo = this.emprendedor.cliente;
    this.usuario.email = this.emprendedor.email;
    this.usuario.aplicacion = this.user.aplicacion;
    this.usuario.basededatos = this.user.basededatos;
    this.usuario.idunico = this.idunico;
    this.usuario.per = '2';
    this.usuario.token = '123';
    this.usuario.activo = '1';
  }
}
