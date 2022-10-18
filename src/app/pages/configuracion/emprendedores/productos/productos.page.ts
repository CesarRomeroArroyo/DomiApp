import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductosModel } from 'src/app/core/models/productosModel';
import { ContextService } from 'src/app/core/services/context.service';
import { ProxyService } from 'src/app/core/services/proxy.service';

@Component({
  selector: "app-productos",
  templateUrl: "./productos.page.html",
  styleUrls: ["./productos.page.scss"],
})
export class ProductosPage implements OnInit {
  public data: any;
  public columns: Array<any> = [];
  showModal = false;

  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private contextService: ContextService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.columns = [
      { title: "Nombre", name: "nombre" },
      { title: "Codigo", name: "codigo" },
      { title: "Descripcion", name: "descripcion" },
      { title: "Categoria", name: "categoria" },
    ];
    this.buscarProductos();
    this.contextService.data = new ProductosModel();
  }

  ionViewDidEnter() {
    this.columns = [
      { title: "Nombre", name: "nombre" },
      { title: "Codigo", name: "codigo" },
      { title: "Descripcion", name: "descripcion" },
      { title: "Categoria", name: "categoria" },
    ];
    this.buscarProductos();
    this.contextService.data = new ProductosModel();
  }

  async buscarProductos() {
    this.data = await this.proxyService.getMethod("list/productos/");
  }

  gotToNew() {
    this.contextService.data = new ProductosModel();
    this.router.navigate(["dashboard", "productos", "admin"]);
  }

  gotoEdit(producto: any) {
    this.contextService.data = producto;
    this.router.navigate(["dashboard", "productos", "admin"]);
  }

  async delete(producto: any) {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea eliminar el producto?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {},
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: async () => {
            await this.proxyService.deleteMethod(
              "delete/productos",
              producto.id
            );
            this.data = await this.proxyService.getMethod("list/productos/");
          },
        },
      ],
    });
    await alert.present();
  }
}
