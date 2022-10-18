import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TipoEmprendedoresModel } from 'src/app/core/models/tipoEmprendedoresModel';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-tipo-emprededor',
  templateUrl: './tipo-emprededor.page.html',
  styleUrls: ['./tipo-emprededor.page.scss'],
})
export class TipoEmprededorPage implements OnInit {
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
      { title: 'Nombre', name: 'nombre' }
    ];
    this.buscarTiposEmprendedores();
    this.contextService.data = new TipoEmprendedoresModel();
  }

  ionViewWillEnter() {
    this.columns = [
      { title: 'Nombre', name: 'nombre' }
    ];
    this.buscarTiposEmprendedores();
    this.contextService.data = new TipoEmprendedoresModel();
  }

  async buscarTiposEmprendedores(){
    this.data = await this.proxyService.getMethod("list/emprendedores_tipo/");
  }

  gotToNew(){
    this.contextService.data = new TipoEmprendedoresModel();
    this.router.navigate(['dashboard', 'admintipoemprende']);
  }

  gotoEdit(emprendedor: any) {
    this.contextService.data = emprendedor;
    this.router.navigate(['dashboard', 'admintipoemprende']);
  }

  async delete(emprendedor: any) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar el Tipo de Emprendedor?',
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
            await this.proxyService.deleteMethod("delete/emprendedores_tipo", emprendedor.id);
            this.data = await this.proxyService.getMethod("list/emprendedores_tipo/");
          }
        }
      ]
    });
    await alert.present();
  }

}
