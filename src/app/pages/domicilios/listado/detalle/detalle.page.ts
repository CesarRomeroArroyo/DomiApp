import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from '../../../../../environments/environment';
import { DomiciliosSeguimientosModel } from 'src/app/core/models/domiciliosSeguimientosModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  public historial_domi: any = [];
  flagestadocancelado = false;
  user: any;
  public estado: any;
  public tiempos_domim: any = [];
  public domicilio_actual: any;
  domiciliarios: any;
  domiAsginado:any = null;
  seguimiento: DomiciliosSeguimientosModel = new DomiciliosSeguimientosModel();
  estadosCancelacion: any = [];
  private ws: any;

  constructor(
    private localStorage: LocalStorageService,
    private proxyService: ProxyService,
    private contextService: ContextService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.historial_domi = this.contextService.data;
    console.log(this.historial_domi);
    
    this.historial_domi['valor_total'] = parseInt(this.historial_domi.pago_domiciliario, 10) + parseInt(this.historial_domi.pago_emprendedor, 10);
    this.estado = this.historial_domi.domi_estado;
    console.log(this.estado);    
    this.consultaHistorial();
    this.validarEstadosDomicilio();
    this.buscarDomicilio();
    this.iniciarWebSockets();
    this.obtenerEstado();
  }

  iniciarWebSockets(){
    this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
    this.ws.onopen = (event) => {
      console.log("Socket Connected");            
    };
    this.ws.onclose = function(event) {
      console.log("WebSocket is closed now.");
    };
  }

  async obtenerEstado(){
    const estados: any = await this.proxyService.getMethod("list/general/domicilios_estados/");
    console.log(estados);
    this.estadosCancelacion = estados.filter((e) => {
      return e.id == '4' || e.id == '6';
    });
    if(this.user.permisos==2){
      this.estadosCancelacion = this.estadosCancelacion.filter((a) => { return a.id != 6});
    }
    console.log(this.estadosCancelacion);
    
  }

  validarEstadosDomicilio() {
       
    switch (this.estado) {
      case '4':
        this.flagestadocancelado = true;
        break;
      case '5':
        this.flagestadocancelado = true;
        break;
      case '6':
        this.flagestadocancelado = true;
        break;
    }
  }

  async consultaHistorial(){
    this.tiempos_domim = await this.proxyService.getMethod('getBySeguimientoDomicilio/'+ this.historial_domi.domi_id);
    this.domiciliarios = await this.proxyService.getMethod('list/domiciliarios/');  
  }

  buscarHoraFecha(estadoactual?: string, historial?:any) {
    return historial.filter((data)=> {
      return data.estado == estadoactual;
    }).map((res)=>{
      var today  = new Date(res.fecha);
      return today.toDateString() + ' ' + res.hora;
    });
  }

  async buscarDomicilio() {
    this.domicilio_actual = [];
    const domi = await this.proxyService.getMethod('getById/domicilios/' + this.historial_domi.domi_id)
    this.domicilio_actual = domi[0];
    console.log(this.domicilio_actual);
    
  }

  async actualizarEstadoDomicilio(estado: any) {
    this.domicilio_actual.estado = estado;
    this.proxyService.putMethod('update/domicilios/', this.domicilio_actual);
    const toast = await this.toastController.create({
      message: 'Domicilio Actualizado Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard','listado']);
  }


  async asignarDomiciliario(){
    this.domicilio_actual.iddomiciliario = this.domiAsginado;
    await this.proxyService.putMethod('update/domicilios/', this.domicilio_actual);
    this.actualizarEstadoDomicilio('2');
    this.ws.send(JSON.stringify({id: 'guardarDomicilios'}));    
    this.prepararSeguimiento();
    await this.proxyService.postMethod('save/domicilios_seguimientos/', this.seguimiento);
    this.router.navigate(['dashboard','listado']);
  }

  prepararSeguimiento(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.seguimiento.iddomicilio = this.domicilio_actual.id;
    this.seguimiento.fecha = yyyy+"-"+mm+"-"+dd;
    this.seguimiento.hora = today.getHours().toString()+":"+today.getMinutes();
    this.seguimiento.estado = this.domicilio_actual.estado;
    this.seguimiento.cliente = this.user.codigo;
  }

  ionViewWillLeave() {
    if(this.ws){
      this.ws.close();
    }
  }

  async validarActualizacion(estado: any){
    const alert = await this.alertController.create({      
      header: '',
      message: 'Esta seguro de actulizar el domicilio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: async () => {
            this.actualizarEstadoDomicilio(estado);
          }
        }
      ]
    });

    await alert.present();
  }

}
