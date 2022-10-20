import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProxyService } from 'src/app/core/services/proxy.service';
import { UsuarioModel } from '../../core/models/usuarioModel';
import { DomiciliarioModel } from '../../core/models/domiciliariosModel';
import { EmprendedoresModel } from '../../core/models/emprendedoresModel';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user: any;
  domi: any;
  emprendedor: any;
  ObjIdunico: any;
  newPasswordDomi: string;
  newPasswordEmprendedor: string;

  constructor(
    private localStorage: LocalStorageService,
    private proxyService: ProxyService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = new DomiciliarioModel();
    this.emprendedor = new EmprendedoresModel();
    this.fetchData();
  }

  ionViewDidEnter() {
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.domi = new DomiciliarioModel();
    this.emprendedor = new EmprendedoresModel();
    this.fetchData();
  }

  async fetchData() {
    this.ObjIdunico = { "idunico": this.user.idunico };
    if (this.user.permisos === '1' || this.user.permisos == '3') {
      const infoDomi = await this.proxyService.postMethod("/getByIdUnico/domiciliarios/", this.ObjIdunico);
      this.domi = infoDomi[0];
    }
    if (this.user.permisos === '2') {
      const infoEmprendedor = await this.proxyService.postMethod("/getByIdUnico/emprendedores/", this.ObjIdunico);
      this.emprendedor = infoEmprendedor[0];
    }
  }

  async guardarPassword(){
    if (this.user.permisos === '1'){
      if(this.emprendedor.password.trim() == this.newPasswordEmprendedor.trim()){
        const usuario:any =  {iduser: this.user.iduser, pass:this.emprendedor.password};        
        await this.proxyService.putMethod("update_usuario_sgi/", usuario);
        const toast = await this.toastController.create({
          message: 'La nueva contraseña fue guardada correctamente',
          duration: 4000,
          color: 'success'
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Las contraseñas no coinciden, favor Validar',
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      }
    }

    if (this.user.permisos === '2'){
      if(this.emprendedor.password.trim() == this.newPasswordEmprendedor.trim()){
        const usuario:any =  {
          iduser: this.user.iduser,
          Nombre: this.emprendedor.nombre, 
          pass:this.emprendedor.password,
          user:this.emprendedor.usuario
        };
        this.emprendedor.direccion = this.emprendedor.direccion;
        this.emprendedor.telefono = this.emprendedor.telefono;
        await this.proxyService.putMethod("update/emprendedores/", this.emprendedor);
        await this.proxyService.putMethod("update_usuario_sgi/", usuario);
        const toast = await this.toastController.create({
          message: 'La nueva contraseña fue guardada correctamente',
          duration: 4000,
          color: 'success'
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Las contraseñas no coinciden, favor Validar',
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      }
    }

    if (this.user.permisos == '3') {
      if(this.domi.password.trim() == this.newPasswordDomi.trim()){
        const usuario:any =  {iduser:this.user.iduser, pass:this.domi.password};
        await this.proxyService.putMethod("update/domiciliarios/", this.domi);
        await this.proxyService.putMethod("update_usuario_sgi/", usuario);
        const toast = await this.toastController.create({
          message: 'La nueva contraseña fue guardada correctamente',
          duration: 4000,
          color: 'success'
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Las contraseñas no coinciden, favor Validar',
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      }
    }
    
  }
}
