import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomiciliosModel } from 'src/app/core/models/domiciliosModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  public columns: Array<any> = [];
  public data: any;
  user: UsuarioModel;
  private ws: any;

  constructor(
    private router: Router,
    private proxyService: ProxyService,
    private contextService: ContextService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.contextService.data = new  DomiciliosModel();
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.columns = [
      { title: 'Fecha', name: 'domi_fecha' },
      { title: 'Emprendedor', name: 'emprende_nombre' },
      { title: 'Cliente', name: 'cliente_nombre' },
      { title: 'Dirección Cliente', name: 'cliente_direccion' },
      { title: 'Domiciiliario', name: 'domiciliario_nombre' },
      { title: 'Estado', name: 'domi_estado_texto' },
    ];
    this.getDomicilios();
  }

  async getDomicilios(){
    let data = [];
    this.data = await this.proxyService.postMethod("domicilesHistoric/", {cliente: this.user?.codigo});
    console.log(this.data);
    this.iniciarWS();
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
          }      
          if(msg.id === 'domicilioActualizado' && this.user.permisos=='1'){
            console.log("Domicilio Actualizado desde el server avisado");
            this.getDomicilios();
          }      
        };
  }

  gotoEdit(domi: any) {
    this.contextService.data = domi;
    this.router.navigate(['dashboard', 'detalle']);
  }

  ionViewWillLeave() {
    if(this.ws){
      this.ws.close();
    }
  }

}
