import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { UsuarioModel } from './core/models/usuarioModel';
import { LocalStorageService } from './core/services/local-storage.service';
import { ProxyService } from './core/services/proxy.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  user: UsuarioModel;
  private ws: any;
  constructor(
    private localStorage: LocalStorageService,
    private proxyService: ProxyService,
    private toastController: ToastController,
  ) {
    this.conectarWS();
  }

  ngOnInit() {
    this.conectarWS();
  }

  conectarWS(){
    this.user = this.localStorage.getItem("DOMIAPP_USER");
      if(this.user?.permisos=='1'){
        this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
        this.ws.onopen = (event) => {
          console.log("Socket Connected");            
        };
        this.ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if(msg.id === 'domicilioCreado' && this.user.permisos=='1'){
            console.log("Domicilio Creado desde el server avisado");
            this.mostarMensaje();
          }     
          if(msg.id === 'domicilioActualizado' && this.user.permisos=='1'){
            console.log("Domicilio Actualizado desde el server avisado");
            this.mostarMensajeActualizado();
          }  
        };
      }
  }

  async mostarMensaje(){
    const toast = await this.toastController.create({
      message: 'Nuevo Domicilio Solicitado...',
      duration: 5000,
      color: 'success'
    });  
    toast.present();  
  }

  async mostarMensajeActualizado(){
    const toast = await this.toastController.create({
      message: 'Hay Domicilios Actualizados por verificar...',
      duration: 5000,
      color: 'success'
    });  
    toast.present();  
  }

  ngOnDestroy() {
    if(this.ws){
      this.ws.close();
    }
  }

  ionViewWillLeave() {
    if(this.ws){
      this.ws.close();
    }
  }
}
