import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductosModel } from 'src/app/core/models/productosModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { ContextService } from 'src/app/core/services/context.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import * as uuid from "uuid";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  producto: any;
  edit = false;
  user: any;
  usuario: UsuarioModel;
  categorias: any;
  idunico = uuid.v4();
  image: any;

  constructor(
    private contextService: ContextService,
    private proxyService: ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.user = this.localStorage.getItem("DOMIAPP_USER");
    this.producto = this.contextService.data;
    if (this.producto.codigo != "") {
      this.edit = true;
    }
    this.obtenerCategorias();
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem("DOMIAPP_USER");
    this.producto = this.contextService.data;
    if (this.producto.codigo != "") {
      this.edit = true;
    }
    this.obtenerCategorias();
  }

  async changeIdCategories(value: string) {
    const { nombre } = this.categorias.find((categoria) => categoria.id == value);
    this.producto.categoria_id = value;
    this.producto.categoria = nombre;
  }

  changeListener($event) : void {
    this.fileChangeEvent($event.target);
  }

  fileChangeEvent(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

  async obtenerCategorias() {
    this.categorias = await this.proxyService.getMethod("list/categorias/");
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea guardar los datos del producto?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {
            this.router.navigate(["dashboard", "productos"]);
          },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: () => {
            this.guardarDatos();
          },
        },
      ],
    });

    await alert.present();
  }

  async guardarDatos() {
    this.producto.categoria = this.producto.categoria_id;
    delete this.producto.categoria_id;
    this.producto.cliente = this.user.codigo;
    if (this.edit) {
      this.producto.foto = this.image;
      this.proxyService.putMethod("update/productos/", this.producto);
    } else {
      this.producto.foto = this.image;
      this.proxyService.postMethod("save/productos/", this.producto);
    }
    this.contextService.data = new ProductosModel();
    const toast = await this.toastController.create({
      message: "Datos Guardados Correctamente",
      duration: 3000,
      color: "success",
    });
    toast.present();
    this.router.navigate(['dashboard', 'productos']);
  }

  isProduct(tipo_producto: number) {
    return tipo_producto == 0 ? true : false;
  }
}
