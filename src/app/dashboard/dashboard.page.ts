import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public typeUser:any;  

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

  gotTo(ruta:any){
    this.router.navigate(ruta)
  }

  logout(){
    this.localStorage.clearToken();
    this.router.navigate(['login']);
  }
}
