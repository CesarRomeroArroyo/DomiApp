import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { DomiciliosModel } from 'src/app/core/models/domiciliosModel';
import { EmprendedoresModel } from 'src/app/core/models/emprendedoresModel';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { environment } from './../../../environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  dataEmprendedor: any;
  domicileOption: number = 0;
  ObjIdunico: any;
  position: any;
  user: UsuarioModel;
  emprendedores: any;
  clientes: any;
  cliente: any;
  emprendedor: any;
  direccion_compra: string = '';
  direccion_entrega: string = '';
  telefono: any = '';
  valores: any;
  configuracion: any;
  domicilio: DomiciliosModel = new DomiciliosModel();
  total=0;
  private ws: any;
  aFacturar: any = [];
  facturas: any = [];
  totalGral =0;
  modal = false;
  selectedFile: any = null;
  constructor(
    private loadingController: LoadingController,
    private localStorage: LocalStorageService,
    private proxyService: ProxyService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.user = this.localStorage.getItem("DOMIAPP_USER");
    this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
    this.ws.onopen = (event) => {
      console.log("Socket Connected");            
    };
  }

  ionViewWillEnter() {
    this.selectedFile = null;
    this.user = this.localStorage.getItem("DOMIAPP_USER");
    this.dataEmprendedor = new EmprendedoresModel();
    
    this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
    this.ws.onopen = (event) => {
      console.log("Socket Connected");            
    };
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if(msg.id === 'domicilioActualizado'){
        console.log("Domicilio Actualizado desde el server avisado");
        this.getAFacturar();
        this.getMisFacturar();
      }      
    };
    this.getEmprendedor();
    this.getClientesByEmprendedor();
    this.getConfiguracion();
    if (this.user.permisos === '1') {
      this.getAFacturar();
    }
    if(this.user.permisos=='2'){
      this.getMisFacturar();
      this.getLocation();
    }
  }

  async getLocation() {
    try{
      const { idunico, permisos} = this.localStorage.getItem("DOMIAPP_USER");
      this.position = await Geolocation.getCurrentPosition();
      this.ObjIdunico = { "idunico": idunico };
      this.dataEmprendedor = await this.proxyService.postMethod("/getByIdUnico/emprendedores/", this.ObjIdunico);
        if (this.dataEmprendedor[0].lat === "" && this.dataEmprendedor[0].lon === "") {
          this.dataEmprendedor[0].lat = await this.position.coords.latitude;
          this.dataEmprendedor[0].lon = await this.position.coords.longitude;
          this.proxyService.putMethod("update/emprendedores/", this.dataEmprendedor[0]);
        }
    } catch{
      const toast = await this.toastController.create({
        message: 'Por favor dale permisos de ubicacion a la Aplicacion',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
      this.getLocation();
    }
  }

  async getInfoEmprendedoresSelector(){
    const emprende = this.emprendedores.find((e)=> {return e.iduser == this.emprendedor});
    this.dataEmprendedor = await this.proxyService.postMethod("/getByIdUnico/emprendedores/",{ "idunico": emprende.idunico } );
  }

  async getEmprendedor(){
    this.emprendedores = await this.proxyService.getMethod("listEmprendedores/sgi/usuario/");
  }

  async getClientesByEmprendedor(){
    this.clientes = await this.proxyService.getMethod("getClientesByEmprendedor/"+this.user.iduser);
  }

  async getConfiguracion(){
    this.valores = await this.proxyService.getMethod("/valoresDomicilios/"+this.dataEmprendedor.id);    
    this.configuracion = await this.proxyService.getMethod("getConfiguracion/");
  }

  getTotalFactura(conf){
    this.total = (parseInt(conf.pago_emprendedor, 10) +parseInt(conf.pago_domiciliario, 10));
    return this.total;
  }

  async prepararDomicilio(){    
    if(this.domicileOption != 0) {
      if((this.telefono != '') && (this.direccion_entrega != "")){
        if (this.domicileOption == 1){
          this.domicilio.nombre_cliente = this.user.Nombre; 
          this.domicilio.direccion_compra = this.direccion_compra;
        } else {
          this.domicilio.nombre_cliente = this.cliente;
          this.domicilio.direccion_compra = this.dataEmprendedor[0].direccion;
        }
        this.domicilio.tipo_compra = this.domicileOption;
        const fecha = new Date();
        const day:string = fecha.getDate().toString();
        const pmonth = fecha.getMonth()+1;
        const month = pmonth.toString();
        const year:string = fecha.getFullYear().toString();
        const fechaActual = year+"-"+month+"-"+day;
        this.domicilio.fecha = fechaActual;
        this.domicilio.hora = fecha.toLocaleTimeString();
        this.domicilio.direccion_entrega = this.direccion_entrega;
        this.domicilio.cliente = this.user.codigo;
        this.domicilio.valor = this.total;
        this.domicilio.telefono_cliente = this.telefono;
        this.domicilio.estado = 1;
        console.log(this.domicilio);
        await this.proxyService.postMethod('save/domicilios/', this.domicilio);
        this.ws.send(JSON.stringify({id: 'domicilioCreado'}));
        this.domicilio = new DomiciliosModel();
        this.telefono = null;
        this.direccion_entrega = null;
        this.direccion_compra = null;
        this.cliente = null;
        const toast = await this.toastController.create({
          message: 'Domicilio Creado Correctamente',
          duration: 4000,
          color: 'success'
        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Debe ingresar Direccion de Entrega y el Número de Teléfono para solicitar el domicilio',
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      }
   } else {
    const toast = await this.toastController.create({
      message: 'Debe generar un nuevo domicilio',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
   }
  }

  async getAFacturar() {
    this.aFacturar = await this.proxyService.postMethod('domicilesEntregados/', {cliente: this.user.codigo});        
    this.calcularValorGeneral();
  }

  async getMisFacturar() {
    const { idunico, permisos} = this.localStorage.getItem("DOMIAPP_USER");
    this.ObjIdunico = { "idunico": idunico };
    this.dataEmprendedor = await this.proxyService.postMethod("/getByIdUnico/emprendedores/", this.ObjIdunico);
    this.facturas = await this.proxyService.postMethod('obtenerMisFacturas/', {emprende: this.dataEmprendedor[0].id, cliente: this.user.codigo});        
    console.log(this.facturas);
    this.calcularValorGeneralFactura();
  }

  calcularValorGeneral(){
    this.totalGral = 0;
    this.aFacturar.forEach(d => {
      this.totalGral += parseInt(d.pago_emprendedor, 10)+parseInt(d.pago_domiciliario, 10);
    }); 
  }

  calcularValorGeneralFactura(){
    this.totalGral = 0;
    this.facturas.forEach(d => {
      this.totalGral += parseInt(d.pago_emprendedor, 10)+parseInt(d.pago_domiciliario, 10);       
    }); 
  }

  async facturar(){
    const domis = this.aFacturar.map((d: any)=>{
      return {domi : d.domi_id}
    })    
    const data = await this.proxyService.putMethod("facturarDomicilios/", domis);
    const toast = await this.toastController.create({
      message: 'Domicilio Facturados Correctamente',
      duration: 4000,
      color: 'success'
    });
    toast.present();
    this.getAFacturar();
    this.ws.send(JSON.stringify({id: 'domicilioActualizado'}));
  }

  async pagarFacturar(){
    const loading = await this.loadingController.create({      
      message: 'Enviando evidencia de pago. Por favor Espere...'
    });
    await loading.present();
    const domis = this.facturas.map((d: any)=>{
      return {domi : d.domi_id, image: this.selectedFile}
    })    
    const data = await this.proxyService.putMethod("pagarDomicilios/", domis);
    const toast = await this.toastController.create({
      message: 'Se envio la evidencia de pago Correctamente',
      duration: 4000,
      color: 'success'
    });
    toast.present();
    this.getAFacturar();
    this.ws.send(JSON.stringify({id: 'domicilioActualizado'}));
    await loading.dismiss();
    this.modal=false;
    this.selectedFile = null;
  }


  subiendoArchivo(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      let form = new FormData();
      form.append('file',img.files[0]);
      const id = 'images/123';
      form.append('id',id);
      this.proxyService.postMethod('subirArchivo/', form);

    }
  }

  async cargarImagen(event){
    const image =<File>event.target.files[0];
    console.log(image);
    if(image.type == "image/jpeg" || image.type == "image/png" && image.size < 2592688){
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
        console.log(this.selectedFile);
      }
      reader.readAsDataURL(image);
    } else {
      const toast = await this.toastController.create({
        message: 'Solo puede enviar archivos de imagen de no mas de 2,5MB',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
    }
  }
  test(){this.ws.send(JSON.stringify({id: 'domicilioCreado'}));}
}
