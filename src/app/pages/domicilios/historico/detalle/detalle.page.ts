import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  public historial_domi: any = [];
  flagestadocancelado = false;
  user: any;
  public estado : number;
  public tiempos_domim: any = [];
  public domicilio: any;
  constructor(
    private loadingController: LoadingController,
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
    if(this.historial_domi){      
      this.cargarData();
    }
  }

  async cargarData(){
    
    this.historial_domi.valor_total = parseInt(this.historial_domi.pago_domiciliario, 10) + parseInt(this.historial_domi.pago_emprendedor, 10);
    this.estado = parseInt(this.historial_domi.domi_estado, 10);
    console.log(this.estado);    
    this.consultaHistorial();
    this.validarEstadosDomicilio();
    if(this.estado == 9){
      this.buscarDomicilio();
    }
    
  }

  validarEstadosDomicilio() {       
    switch (this.estado) {
      case 4:
        this.flagestadocancelado = true;
        break;
      case 5:
        this.flagestadocancelado = true;
        break;
      case 6:
        this.flagestadocancelado = true;
        break;
    }
  }

  async consultaHistorial(){
    this.tiempos_domim = await this.proxyService.getMethod('getBySeguimientoDomicilio/'+ this.historial_domi.domi_id);        
  }

  async buscarDomicilio(){
    const loading = await this.loadingController.create({      
      message: 'Cargando Evidencias de pago del Domicilio...'
    });
    await loading.present();
    const domi: any =  await this.proxyService.getMethod('getById/domicilios/'+this.historial_domi.domi_id);
    if(domi.length > 0){
      this.domicilio = domi[0];
    }
    console.log(this.domicilio);
    await loading.dismiss();
  }

  buscarHoraFecha(estadoactual?: string, historial?:any) {
    return historial.filter((data)=> {
      return data.estado == estadoactual;
    }).map((res)=>{
      var today  = new Date(res.fecha);
      return today.toDateString() + ' ' + res.hora;
    });
  } 

  async actualizarEstadoDomicilio(estado: any) {
    this.domicilio.estado = estado;
    this.proxyService.putMethod('update/domicilios/', this.domicilio);
    const toast = await this.toastController.create({
      message: 'Domicilio Actualizado Correctamente',
      duration: 3000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['dashboard','historico']);
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
