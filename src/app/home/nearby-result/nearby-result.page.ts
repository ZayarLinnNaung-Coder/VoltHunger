import { Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet';
import { NearbyFindRequest } from 'src/app/domain/NearbyFindRequest';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'nearby-result.page.html',
  styleUrls: ['nearby-result.page.scss'],
})
export class NearByResultPage implements OnDestroy {

  map!: L.Map;
  marker: L.Marker | null = null;
  request!: NearbyFindRequest;

  myLocationIcon = L.icon({
    iconUrl: '/assets/images/me.webp',
    iconSize: [48, 48], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  stationIcon = L.icon({
    iconUrl: '/assets/images/station.png',
    iconSize: [48, 48], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  nearestStationIcon = L.icon({
    iconUrl: '/assets/images/nearestStation.png',
    iconSize: [28, 48], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  constructor(public locationService: LocationService) { }
  
  ionViewDidEnter() {


    const requestInStr = localStorage.getItem('NearbyFindRequest');
    if (requestInStr) {
      this.request = JSON.parse(requestInStr);
      console.log(this.request);

      L.Icon.Default.imagePath = '/assets/images/';

      // Initialize the map only if it is not already initialized
      if (!this.map) {
        this.map = L.map('resultMap').setView([this.request.lat as number, this.request.lng as number], 16);
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: 'edupala.com'
        }).addTo(this.map);
      }

      this.locationService.reloadKDTree().subscribe(response => {
        this.initDataOnMap();
      })

    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  initDataOnMap() {

    // Fetch and add other points
    this.locationService.fetchPointsWithinDistance(this.request.lat as number, this.request.lng as number, this.request.distance as number).subscribe((response: any) => {
      console.log(response)
      const pointPromises = response.map((point: any) => {
        return new Promise<void>((resolve) => {
          this.addMarkerToMap(
            "Volt", 
            { lat: point.latitude, lng: point.longitude }, 
            this.stationIcon
          );
          resolve();
        });
      });

      Promise.all(pointPromises).then(() => {
      
        // Add the user's location marker
        this.addMarkerToMap(
          "Volt", 
          { lat: this.request.lat as number, lng: this.request.lng as number }, 
          this.myLocationIcon
        );
        
      });

    });

    this.locationService.getNearestPoint(this.request.lat as number, this.request.lng as number).subscribe((response: any) => {
      
      const pointPromises = new Promise<void>((resolve) => {
          this.addMarkerToMap(
            "Nearest", 
            { lat: response.latitude, lng: response.longitude }, 
            this.nearestStationIcon
          );
          resolve();
      });
      
      Promise.all([pointPromises]).then(() => {
      
        // Add the user's location marker
        this.addMarkerToMap(
          "My Location", 
          { lat: this.request.lat as number, lng: this.request.lng as number }, 
          this.myLocationIcon
        );
        
      });

    });
    
  }

  addMarkerToMap(title: string, latlng: { lat: number, lng: number }, icon: L.Icon) {

    this.map.setView(latlng, 16)
    
    L.marker(latlng, { icon: icon }).addTo(this.map)
      .bindPopup(title)
      .openPopup();
  }

}