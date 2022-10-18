import { Component, OnInit } from '@angular/core';;
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { DomiciliarioModel } from 'src/app/core/models/domiciliariosModel';
import { CategoriasModel } from 'src/app/core/models/categoriasModels';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  public data: any;
  public datachangue:any;
  public columns: any[] = [];
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
      { title: 'Estado', name: 'estado' },
    ];

    this.buscarDomiciliarios();
    this.contextService.data = new CategoriasModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: 'Nombre', name: 'nombre' },
      { title: 'Estado', name: 'estado' },
    ];
    this.buscarDomiciliarios();
    this.contextService.data = new CategoriasModel();
  }

  async buscarDomiciliarios(){
    this.data = await this.proxyService.getMethod("list/categorias/"); 
  }

  gotToNew(){
    this.contextService.data = new CategoriasModel();
    this.router.navigate(['dashboard','admincategorias']);
  }

  gotoEdit(domi: any){
    this.contextService.data = domi;
    this.router.navigate(['dashboard','admincategorias']);
  }

  async delete(domi: any){
    const alert = await this.alertController.create({
      header: '',
      message: 'Desea eliminar la categoria?',
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
           await this.proxyService.deleteMethod("delete/categorias", domi.id); 
            this.data = await this.proxyService.getMethod("list/categorias/"); 
          }
        }
      ]
    });

    await alert.present();
  }
}

