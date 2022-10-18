import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClientesModel } from 'src/app/core/models/clientesModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from '../../../../core/services/proxy.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  public data: any;
  public columns: Array<any> = [];
  showModal = false;

  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private contextService: ContextService,
    private localStorage: LocalStorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.columns = [
      { title: 'Razon Social', name: 'razon_social' },
      { title: 'Tipo Id', name: 'tip_ide' },
      { title: 'Nro Id', name: 'num_ide' },
      { title: 'Telefono 1', name: 'tel_uno' },
      { title: 'Telefono 2', name: 'tel_dos' },
      { title: 'Email', name: 'mail' },
    ];
    this.buscarClientes();
    this.contextService.data = new ClientesModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: 'Razón Social', name: 'razon_social' },
      { title: 'Tipo Id', name: 'tip_ide' },
      { title: 'Nro Id', name: 'num_ide' },
      { title: 'Telefono 1', name: 'tel_uno' },
      { title: 'Telefono 2', name: 'tel_dos' },
      { title: 'Email', name: 'mail' },
    ];
    this.buscarClientes();
    this.contextService.data = new ClientesModel();
  }

  async buscarClientes() {
    const user = this.localStorage.getItem('DOMIAPP_USER');
    this.data = await this.proxyService.getMethod("getClientesByEmprendedor/"+user.iduser);
  }

  gotToNew() {
    this.contextService.data = new ClientesModel();
    this.router.navigate(['dashboard', 'adminclientes']);
  }

  gotoEdit(cliente: any) {
    this.contextService.data = cliente;
    this.router.navigate(['dashboard', 'adminclientes']);
  }

  async delete(cliente: any) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar el Cliente?',
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
            await this.proxyService.deleteMethod("delete/clientes", cliente.id);
            this.data = await this.proxyService.getMethod("list/clientes/");
            this.eliminarDireccionesClientes(cliente.id);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarDireccionesClientes(idCliente) {
    const getDireccion: any = await this.proxyService.getMethod(`clientedireccion/${idCliente}`);
    if (getDireccion.length > 0) {
      await this.proxyService.deleteMethod("eliminarDireccionesxCliente", idCliente);
    } 
  }
}