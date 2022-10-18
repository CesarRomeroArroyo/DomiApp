import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProxyService } from 'src/app/core/services/proxy.service';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { UsuarioModel } from 'src/app/core/models/usuarioModel';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
})
export class MapasPage implements OnInit, OnDestroy {
  domiciliarios: any = [];
  map: Leaflet.Map;
  layerGroup: any;
  layersGroups: any;
  gps: any;
  markers = [];
  user: UsuarioModel;
  private ws: any;

  constructor(
    private proxy: ProxyService,
    private loadingController: LoadingController,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){    
    this.user = this.localStorage.getItem('DOMIAPP_USER');
    this.obtenerDomiciliarios();
    this.getLocalPosition();
    this.iniciarWebSockets();
  }

  iniciarWebSockets(){
    this.ws = new WebSocket(environment.sockets_url+this.user.codigo);
    this.ws.onopen = (event) => {
      console.log("Socket Connected");      
      setInterval(() =>{
        this.ws.send(JSON.stringify({id: 'adminSolicitaUbicacion'}));
        console.log('adminSolicitaUbicacion');        
      }, 10000);
    };

    this.ws.onclose = function(event) {
      console.log("WebSocket is closed now.");
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if(msg.id === 'ping'){
        console.log("SERVER PING");        
      }
      if(msg.id === 'ubicacionActual'){
        console.log("LON: "+msg.lon+" LAT: "+msg.lat+" DOMI: "+msg.domiciliario);    
        this.gestionarMarkers(msg.lon, msg.lat, msg.domiciliario);    
      }
    };
  }

  async obtenerDomiciliarios(){
    this.domiciliarios = await this.proxy.getMethod('list/domiciliarios/');
  }

  async getLocalPosition(){    
    const loading = await this.loadingController.create({      
      message: 'Estamos ubicandote, por favor espera'
    });
    await loading.present();
    const coordinates = await Geolocation.getCurrentPosition();
    await loading.dismiss();
    this.gps = coordinates;
    this.leafletMap(); 
  }

  leafletMap() {
    if(this.map ==undefined){
      this.map = Leaflet.map('mapId').setView([this.gps.coords.latitude, this.gps.coords.longitude], 13);
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Codigo Fuente',
      }).addTo(this.map);
      this.layerGroup = new Leaflet.LayerGroup().addTo(this.map);
    }
      
  }

  gestionarMarkers(lon, lat, domi){
    const domiciliario = this.domiciliarios.find(d => d.id == domi);
    const icoDomi = Leaflet.icon({
      iconUrl: 'assets/images/domi.png',
      iconSize: [38, 48],
      iconAnchor: [20, 51],
      popupAnchor: [-3, -76]
    });
    const mark: any = this.markers.filter(marker => marker.domi == domi);
    if(mark.length > 0){
      this.layerGroup.clearLayers();
      this.markers.forEach((mark) => {
        if(mark.domi == domi){
          mark.marker = Leaflet.marker([lat, lon], {icon: icoDomi});          
        }
        mark.marker.addTo(this.layerGroup).bindPopup(domiciliario.nombre).openPopup();
      });
      console.log("actualizado marker");
    } else {
      this.layerGroup.clearLayers();
      this.markers.push({lon, lat, domi, marker: Leaflet.marker([lat, lon], {icon: icoDomi})});
      this.markers.forEach((mark) => {
        mark.marker.addTo(this.layerGroup).bindPopup(domiciliario.nombre).openPopup();
        console.log("agregado marker");        
      });
    }
    console.log(this.markers);
    
  }

  ngOnDestroy() {
    this.map.remove();
    if(this.ws){
      this.ws.close();
    }
  }

  ionViewWillLeave() {
    if(this.ws){
      this.ws.close();
    }
  }

}
