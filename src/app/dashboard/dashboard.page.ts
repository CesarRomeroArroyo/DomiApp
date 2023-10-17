import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public typeUser: any;
  selectedItemId: string | null = null; // Variable para rastrear el elemento seleccionado

  items = [
    {
      icon: 'home-sharp',
      text: 'inicio',
      selected: true
    },
    {
      icon: 'bicycle',
      text: 'domiciliarios',
      selected: false
    },
    {
      icon: 'bag-check-outline',
      text: 'emprendedores',
      selected: false
    },
    {
      icon: 'business-outline',
      text: 'domicilios',
      selected: false
    },
    {
      icon: 'cash-outline',
      text: 'finanzas',
      selected: false
    },
    {
      icon: 'map-outline',
      text: 'mapas',
      selected: false
    },
    {
      icon: 'settings-outline',
      text: 'ajustes',
      selected: false
    },
  ];
  
  navigateAndSelect(item) {
    this.items.forEach((i) => {
      i.selected = false;
    });
    item.selected = true;

    // Redirección a la ruta basada en item.text
    this.router.navigate(['dashboard', item.text]);
  }
  


  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.typeUser = this.localStorage.getItem('DOMIAPP_USER');
  }

  ionViewDidEnter() {
    this.typeUser = this.localStorage.getItem('DOMIAPP_USER');
  }

  gotTo(ruta: any) {
    this.router.navigate(ruta)
  }

  logout() {
    this.localStorage.clearToken();
    this.router.navigate(['login']);
    document.location = "https://appdomi.amazing-wright.137-184-198-32.plesk.page/";
  }
}
