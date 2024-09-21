import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet';
import { NearbyFindRequest } from '../domain/NearbyFindRequest';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{

  map!: Leaflet.Map;
  propertyList: any[] = [];
  marker: L.Marker | null = null;

  targetLat: number = 16.7984;
  targetLong: number = 96.1496;
  errorMessage: string = "";
  distance: number = 5;

  showPicker: boolean = false

  newIcon = L.icon({
    iconUrl: '/assets/images/me.webp',
    iconSize: [48, 48], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  constructor(private navCtrl: NavController, private router: Router, public locationService: LocationService) { }

  ionViewDidEnter() {

    this.getLocation();

  }
  
  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    this.showPicker = true;
    
    this.targetLat = lat;
    this.targetLong = lng

    this.pointOnMap(e.latlng)
  }

  ngOnDestroy() {
    this.map.remove(); // Clean up the map instance
  }

  changeLocation() {
    console.log("HELLO")
    this.pointOnMap({lat: this.targetLat, lng: this.targetLong})
  }

  pointOnMap(latlng: { lat: number, lng: number }){

    this.marker?.remove()

    this.map.setView(latlng, this.map.getZoom());

    this.marker = Leaflet.marker(latlng, { icon: this.newIcon }).addTo(this.map)
      .bindPopup('My Location')
      .openPopup();
  }

  onFindingNearby() {
    const request: NearbyFindRequest = new NearbyFindRequest;
    request.lat = this.targetLat;
    request.lng = this.targetLong;
    request.distance = this.distance;

    localStorage.setItem('NearbyFindRequest', JSON.stringify(request))
    this.router.navigate(['home/nearby-results'])
  }

  onCancel(){
    this.showPicker = false
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.targetLat = position.coords.latitude;
          this.targetLong = position.coords.longitude;

          L.Icon.Default.imagePath = '/assets/images/';

          this.map = new Leaflet.Map('map').setView([this.targetLat, this.targetLong], 16);

          Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: 'edupala.com'
          }).addTo(this.map);

          this.map.on('click', this.onMapClick.bind(this));


          this.pointOnMap({ lat: this.targetLat, lng: this.targetLong });

        },
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              this.errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              this.errorMessage = "The request to get user location timed out.";
              break;
            default:
              this.errorMessage = "An unknown error occurred.";
              break;
          }
        }
      );
    } else {
      this.errorMessage = "Geolocation is not supported by this browser.";
    }
  }

}