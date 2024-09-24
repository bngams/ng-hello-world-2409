import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HousingLocationComponent } from "../../components/housing-location/housing-location.component";
import { HousingLocation, HousingLocations } from '../../models/housing-location';
import { HOUSING_LOCATION_LIST } from '../../mocks/housing-location.mock';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  housingLocationList: HousingLocations = HOUSING_LOCATION_LIST;

  // ViewChildren(<selector>)
  @ViewChildren(HousingLocationComponent)
  housingLocationComponents!: QueryList<HousingLocationComponent>;

  constructor() {
    console.log('ViewChildren housingLocationComponents from constructor', this.housingLocationComponents);
  }

  ngOnInit(): void {
    console.log('ViewChildren housingLocationComponents from on init', this.housingLocationComponents);
  }

  ngAfterViewInit(): void {
    console.log('ViewChildren housingLocationComponents from on ngAfterViewInit', this.housingLocationComponents);
  }

  handleOutput(house: HousingLocation): void {
    console.log('custom output with ', house)
  }

}
