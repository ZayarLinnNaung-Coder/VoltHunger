import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from '../const/UrlConstants';
import { Location } from '../domain/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  reloadKDTree(){
    
    const url: string = UrlConstants.BASE_URL + '/locations/reload';
    return this.http.get(url)
    
  }

  fetchAllLocations(){
    const url = `${UrlConstants.BASE_URL}/locations`
    return this.http.get<Location[]>(url)
  }

  addNewlLocations(newLocation: Location){
    const url = `${UrlConstants.BASE_URL}/locations`
    return this.http.post(url, newLocation)
  }

  getNearestPoint(lat: number, lng: number){
    
    const url = `${UrlConstants.BASE_URL}/locations/nearest?lat=${lat}&&lng=${lng}`
    return this.http.get(url)
    
  }

  fetchPointsWithinDistance(lat: number, lng: number, distance: number){
  
    const url = `${UrlConstants.BASE_URL}/locations/within-distance?lat=${lat}&&lng=${lng}&&distance=${distance}`
    return this.http.get(url)

  }

}