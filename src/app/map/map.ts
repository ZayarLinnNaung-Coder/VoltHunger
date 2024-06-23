// import { Component } from '@angular/core';
// import * as L from 'leaflet';
// import * as Leaflet from 'leaflet';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'test.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   map!: Leaflet.Map;
//   propertyList: any[] = [];

//   constructor() { }

//   ionViewDidEnter() {

//     L.Icon.Default.imagePath = '/assets/images/';

//     this.map = new Leaflet.Map('mapId3').setView([42.35663, -71.1109], 16);

//     Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//       attribution: 'edupala.com'
//     }).addTo(this.map);

//     fetch('./assets/data.json')
//       .then(res => res.json())
//       .then(data => {
//         this.propertyList = data.properties;
//         this.leafletMap();
//       })
//       .catch(err => console.error(err));

//       const newIcon = L.icon({
//         iconUrl: '/assets/images/me.png',
//         iconSize: [32, 32], // Size of the icon
//         iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
//         popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
//       });
    
//       // Coordinates for your new point
//       const newPointCoordinates: any = [42.3584, -71.10869]; // Example coordinates (Harvard Square, Cambridge)
    
//       Leaflet.marker(newPointCoordinates, { icon: newIcon }).addTo(this.map)
//         .bindPopup('New Point')
//         .openPopup();
//   }

//   leafletMap() {
//     for (const property of this.propertyList) {
//       Leaflet.marker([property.lat, property.long]).addTo(this.map)
//         .bindPopup(property.city)
//         .openPopup();
//     }
//   }

//   ionViewWillLeave() {
//     this.map.remove();
//   }

// }



fetch('./assets/data.json')
.then(res => res.json())
.then(data => {
  this.propertyList = data.properties;
  this.leafletMap();
})
.catch(err => console.error(err));

const newIcon = L.icon({
  iconUrl: '/assets/images/me.png',
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

// Coordinates for your new point
const newPointCoordinates: any = [42.3584, -71.10869]; // Example coordinates (Harvard Square, Cambridge)

Leaflet.marker(newPointCoordinates, { icon: newIcon }).addTo(this.map)
  .bindPopup('New Point')
  .openPopup();