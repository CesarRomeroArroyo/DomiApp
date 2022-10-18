import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { EmprendedoresModel } from '../../../core/models/emprendedoresModel';

@Component({
  selector: 'app-emprendedores',
  templateUrl: './emprendedores.page.html',
  styleUrls: ['./emprendedores.page.scss'],
})
export class EmprendedoresPage implements OnInit {
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
      { title: 'Nombre', name: 'nombre' },
      { title: 'Identificacion', name: 'num_ide' },
      { title: 'Telefono', name: 'telefono' },
      { title: 'Email', name: 'email' },
    ];
    this.buscarEmprendedores();
    this.contextService.data = new EmprendedoresModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: 'Nombre', name: 'nombre' },
      { title: 'Identificacion', name: 'num_ide' },
      { title: 'Telefono', name: 'telefono' },
      { title: 'Email', name: 'email' },
    ];
    this.buscarEmprendedores();
    this.contextService.data = new EmprendedoresModel();
  }

  async buscarEmprendedores() {
    this.data = await this.proxyService.getMethod("list/emprendedores/");
  }

  gotToNew() {
    this.contextService.data = new EmprendedoresModel();
    this.router.navigate(['dashboard', 'adminemprendedores']);
  }

  gotoEdit(emprendedor: any) {
    this.contextService.data = emprendedor;
    this.router.navigate(['dashboard', 'adminemprendedores']);
  }

  async delete(emprendedor: any) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar el Emprendedor?',
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
            await this.proxyService.deleteMethod("delete/emprendedores", emprendedor.id);
            this.data = await this.proxyService.getMethod("list/emprendedores/");
          }
        }
      ]
    });
    await alert.present();
  }
}
