import { Component } from '@angular/core';
import { HousingLocationComponent } from "../../components/housing-location/housing-location.component";
import { HousingLocations } from '../../models/housing-location';
import { HOUSING_LOCATION_LIST } from '../../mocks/housing-location.mock';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  housingLocationList: HousingLocations = HOUSING_LOCATION_LIST;
}
