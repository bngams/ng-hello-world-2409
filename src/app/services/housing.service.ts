import { Injectable } from '@angular/core';
import { HousingLocation, HousingLocations } from '../models/housing-location';
import { HOUSING_LOCATION_LIST } from '../mocks/housing-location.mock';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  housingLocationList: HousingLocations = HOUSING_LOCATION_LIST;

  housingLocationListSubject: Subject<HousingLocations> = new BehaviorSubject(HOUSING_LOCATION_LIST);

  constructor(private http: HttpClient) { }

  /**
   * Load data in our this.housingLocationList
   * (like a store)
   */
  loadAllHousingLocationsWithAPIDetailedSyntax() {
    const observer = {
      next: ((data: any) => this.housingLocationList = data),
      error: ((error: any) => alert('Error'))
    };
    const observable: Observable<Object> = this.http.get(`http://localhost:3000/locations`);
    observable.subscribe(observer);
  }

  /**
   * Load data in our this.housingLocationList
   * (like a store)
   * Simple syntax (no unsued variables)
   */
  loadAllHousingLocationsWithAPI() {
    this.http.get<HousingLocations>(`http://localhost:3000/locations`).subscribe({
      next: ((data: HousingLocations) => this.housingLocationList = data),
      error: ((error: any) => alert('Error'))
    });
  }

  getAllHousingLocationsWithAPI(): Observable<HousingLocations> {
    return this.http.get<HousingLocations>(`http://localhost:3000/locations`);
  }

  getAllHousingLocations(): HousingLocations {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
  }

  addHousing(house: HousingLocation): void {
    this.housingLocationList.push(house);
  }

  addHousingSubject(house: HousingLocation): void {
    this.housingLocationListSubject.next([...this.housingLocationList, house])
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
