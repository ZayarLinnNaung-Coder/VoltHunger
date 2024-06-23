import { Component } from '@angular/core';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: Leaflet.Map;
  propertyList: any[] = [];
  marker: L.Marker | null = null;

  targetLat!: number;
  targetLong!: number;

  newIcon = L.icon({
    iconUrl: '/assets/images/me.png',
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  constructor() { }

  ionViewDidEnter() {

    L.Icon.Default.imagePath = '/assets/images/';

    this.map = new Leaflet.Map('map').setView([42.35663, -71.1109], 16);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }
  
  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    console.log(`Clicked at ${lat}, ${lng}`);

    this.marker?.remove()
    
    this.targetLat = lat;
    this.targetLong = lng

    this.marker = Leaflet.marker(e.latlng, { icon: this.newIcon }).addTo(this.map)
      .bindPopup('My Location')
      .openPopup();
  }

  changeLocation() {
    throw new Error('Method not implemented.');
  }

}
