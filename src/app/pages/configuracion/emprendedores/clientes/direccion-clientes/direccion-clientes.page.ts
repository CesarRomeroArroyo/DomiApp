import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { ClientesDireccionesModel } from "src/app/core/models/clientesDireccionesModel";
import { ContextService } from "src/app/core/services/context.service";
import { ProxyService } from "src/app/core/services/proxy.service";

@Component({
  selector: "app-direccion-clientes",
  templateUrl: "./direccion-clientes.page.html",
  styleUrls: ["./direccion-clientes.page.scss"],
})
export class DireccionClientesPage implements OnInit {
  @Input() clienteId: number;
  editar: boolean = false;
  clienteDireccion: ClientesDireccionesModel;
  public columns: Array<any> = [];
  public data: any;

  constructor(
    private proxyService: ProxyService,
    private router: Router,
    private contextService: ContextService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.columns = [
      { title: "Direccion", name: "direccion" },
      { title: "Ciudad", name: "ciudad" },
      { title: "Barrio", name: "barrio" },
      { title: "Principal", name: "principal" },
    ];

    this.clienteDireccion = new ClientesDireccionesModel();
    this.fetchClienteDirecciones(this.clienteId);
  }

  ionViewDidEnter() {
    this.columns = [
      { title: "Direccion", name: "direccion" },
      { title: "Ciudad", name: "ciudad" },
      { title: "Barrio", name: "barrio" },
      { title: "Principal", name: "principal" },
    ];

    this.fetchClienteDirecciones(this.clienteId);
  }

  async fetchClienteDirecciones(clienteId: number) {
    this.data = await this.proxyService.getMethod(`clientedireccion/${clienteId}`);
  }

  async guardarDireccion() {
    this.clienteDireccion.idcliente = this.clienteId;
    this.proxyService.postMethod("save/clientes_direcciones/", this.clienteDireccion);
    this.fetchClienteDirecciones(this.clienteId);
  }

  async confirmarGuardado() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea guardar los datos de la direccion del cliente?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "danger",
          id: "cancel-button",
          handler: (blah) => {
            this.router.navigate(["dashboard", "adminclientes"]);
          },
        },
        {
          text: "Si",
          id: "confirm-button",
          cssClass: "success",
          handler: () => {
            this.guardarDireccion();
            this.limpiarCampos();
          },
        },
      ],
    });

    await alert.present();
  }

  async delete(direccionCliente: any) {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea eliminar la direccion cliente?",
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
            await this.proxyService.deleteMethod("delete/clientes_direcciones", direccionCliente.id);
            this.fetchClienteDirecciones(this.clienteId);
          },
        },
      ],
    });

    await alert.present();
  }

  gotoEdit(direccionCliente: any) {
    this.editar = true;
    this.clienteDireccion = direccionCliente;
  }

  async editarDireccionesClientes() {
    const alert = await this.alertController.create({
      header: "",
      message: "Desea editar la direccion del cliente?",
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
          handler: () => {
            this.proxyService.putMethod("update/clientes_direcciones/", this.clienteDireccion);
            this.fetchClienteDirecciones(this.clienteId);
            this.cancelar();
          },
        },
      ],
    });

    await alert.present();
  }

  isEdit() {
    return this.editar;
  }

  cancelar() {
    this.editar = false;
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.clienteDireccion = new ClientesDireccionesModel();
    this.fetchClienteDirecciones(this.clienteId);
  }
}
