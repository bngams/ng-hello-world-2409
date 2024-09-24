import { Injectable } from '@angular/core';
import { HousingLocation, HousingLocations } from '../models/housing-location';
import { HOUSING_LOCATION_LIST } from '../mocks/housing-location.mock';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  housingLocationList: HousingLocations = HOUSING_LOCATION_LIST;

  constructor() { }

  getAllHousingLocations(): HousingLocations {
    return this.housingLocationList;
  }
  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
  }
}
