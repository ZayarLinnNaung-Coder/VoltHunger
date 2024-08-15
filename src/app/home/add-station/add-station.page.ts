import { Component, OnDestroy } from '@angular/core';
import { Location } from 'src/app/domain/Location';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'add-station.page.html',
  styleUrls: ['add-station.page.scss'],
})
export class AddStationPage {

  name: string = '';
  lat!: number;
  lng!: number;

  locationList: Location[] = []

  constructor(private locationService: LocationService){

    this.fetchAllLocation();

  }

  fetchAllLocation(){

    this.locationService.fetchAllLocations().subscribe((result: Location[]) => {
      this.locationList = result
    })

  }

  submitLocation(){
    const location = new Location();
    location.name = this.name;
    location.lat = this.lat;
    location.lng = this.lng;

    this.locationService.addNewlLocations(location).subscribe(result => {
      console.log(result)
      this.fetchAllLocation();
    })
  }

}
