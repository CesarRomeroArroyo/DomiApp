import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { CategoriasModel } from 'src/app/core/models/categoriasModels';
import { DomiciliarioModel } from 'src/app/core/models/domiciliariosModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { Md5 } from 'ts-md5';
import * as uuid from 'uuid';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  cat:CategoriasModel;
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
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.cat = this.contextService.data;
    if(this.cat.nombre != ""){
      this.edit = true;
    }
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.cat = this.contextService.data;
    if(this.cat.nombre != ""){
      this.edit = true;
    }
  }

  async confirmarGuardado(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea guardar los datos de la Categoria?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {
            this.router.navigate(['dashboard','categorias']);
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
    this.cat.cliente = this.user.codigo;
   
    if(this.edit){      
      this.proxyService.putMethod('update/categorias/', this.cat);
    } else {
      this.proxyService.postMethod('save/categorias/', this.cat);
    }
    console.log(this.cat);
    this.contextService.data = new CategoriasModel();
    const toast = await this.toastController.create({
      message: 'Datos Guardados Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard','categorias']);
  }
}
