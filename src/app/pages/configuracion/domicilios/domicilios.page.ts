import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DomiciliosModel } from 'src/app/core/models/domiciliosModel';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.page.html',
  styleUrls: ['./domicilios.page.scss'],
})
export class DomiciliosPage implements OnInit {
   public data: any;
  public columns: Array<any> = [];
  
  showModal = false;
  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private contextService: ContextService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.columns = [
      { title: 'Valor', name: 'valor' },
      { title: 'Fecha', name: 'fecha' },
      { title: 'Hora', name: 'hora' },
      { title: 'Estado', name: 'estado' },
    ];
    this.buscarDomiciliarios();
    this.contextService.data = new  DomiciliosModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: 'Valor', name: 'valor' },
      { title: 'Fecha', name: 'fecha' },
      { title: 'Hora', name: 'hora' },
      { title: 'Estado', name: 'estado' },
    ];
    this.buscarDomiciliarios();
    this.contextService.data = new DomiciliosModel();
  }

  async buscarDomiciliarios() {
    this.data = await this.proxyService.getMethod("list/domicilios/");
    console.log(this.data);
   
  }

  gotToNew() {
    this.contextService.data = new DomiciliosModel();
    this.router.navigate(['dashboard', 'admindomicilios']);
  }

  gotoEdit(domi: any) {
    this.contextService.data = domi;
    this.router.navigate(['dashboard', 'admindomicilios']);
  }

  async delete(domi: any) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar el Domicilio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          id: 'cancel-button',
          handler: (blah) => {

          }
        }, {
          text: 'Si',
          id: 'confirm-button',
          cssClass: 'success',
          handler: async () => {
            await this.proxyService.deleteMethod("delete/domicilios", domi.id);
            this.data = await this.proxyService.getMethod("list/domicilios/");
          }
        }
      ]
    });

    await alert.present();
  }
}

