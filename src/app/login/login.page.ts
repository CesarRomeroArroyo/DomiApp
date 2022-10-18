import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { ProxyService } from '../core/services/proxy.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuario:any =  {user: '', pass:'', codigo:''};
  constructor(
    private proxy:ProxyService,
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login(){
    const user: any = await this.proxy.postMethod('login/', this.usuario);
    console.log(user);
    if(user.length > 0){
      this.localStorage.setItem('DOMIAPP_USER', user[0]);
      const toast = await this.toastController.create({
        message: 'Bienvenido '+user[0].Nombre,
        duration: 3000,
        color: 'success'
      });
      toast.present();
      this.router.navigate(['dashboard', 'inicio']);
    }
    else {
      const toast = await this.toastController.create({
        message: 'Usuario o Password Incorrecto',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
