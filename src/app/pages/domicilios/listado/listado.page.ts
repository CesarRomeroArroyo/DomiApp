import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  public columns: Array<any> = [];
  public data: any;
  user: UsuarioModel;
  
  private ws: any;
  constructor(
    private router: Router,
    private proxyService: ProxyService,
    private toastController: ToastController,
    private contextService: ContextService,
    private localStorage: LocalStorageService
    ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    console.log(this.user );
    this.columns = [
      { title: 'Fecha', name: 'domi_fecha' },
      { title: 'Emprendedor', name: 'emprende_nombre' },
      { title: 'Cliente', name: 'cliente_nombre' },
      { title: 'Dirección Cliente', name: 'cliente_direccion' },
      { title: 'Domiciiliario', name: 'domiciliario_nombre' },
      { title: 'Estado', name: 'domi_estado_texto' },
    ];
    this.getDomicilios();
    this.iniciarWS();
  }

  async getDomicilios(){
    this.data = [];    
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    if (this.user.permisos === '1') {
      this.data = await this.proxyService.postMethod(`domicilesList/`,{cliente: this.user.codigo});      
    }
    if (this.user.permisos === '2') {
      
      const dataEmprendedor = await this.proxyService.postMethod("/getByIdUnico/emprendedores/", {idunico:this.user.idunico});
      const domiEmprende = await this.proxyService.postMethod('domicilesEmprendedor/', {cliente: this.user.codigo, emprende: dataEmprendedor[0].id});        
      console.log(domiEmprende);
      this.data = domiEmprende;      
    }
  }

  iniciarWS(){
    this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
        this.ws.onopen = (event) => {
          console.log("Socket Connected");            
        };
        this.ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if(msg.id === 'domicilioCreado' && this.user.permisos=='1'){
            console.log("Domicilio Creado desde el server avisado");
            this.getDomicilios();
          }      
          if(msg.id === 'domicilioActualizado' && this.user.permisos=='1'){
            console.log("Domicilio Actualizado desde el server avisado");
            this.getDomicilios();
          }      
        };
  }

  gotoEdit(domi: any) {
    this.contextService.data = domi;
    this.router.navigate(['dashboard', 'listado', 'detalle-list']);
  }

  ionViewWillLeave() {
    if(this.ws){
      this.ws.close();
    }
  }

}
