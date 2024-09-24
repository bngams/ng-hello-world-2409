import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HousingLocationComponent } from "../../components/housing-location/housing-location.component";
import { HousingLocation, HousingLocations } from '../../models/housing-location';
import { HOUSING_LOCATION_LIST } from '../../mocks/housing-location.mock';
import { NgFor } from '@angular/common';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  housingLocationList!: HousingLocations;

  // ViewChildren(<selector>)
  @ViewChildren(HousingLocationComponent)
  housingLocationComponents!: QueryList<HousingLocationComponent>;

  // DI with constructor (pattern constructor TS portee nom : type )
  constructor(private housingService: HousingService) {
    console.log('ViewChildren housingLocationComponents from constructor', this.housingLocationComponents);
    // this.initData(); // prefer in ngOnInit (for now seems compliant in constructor but ...)
  }

  ngOnInit(): void {
    console.log('ViewChildren housingLocationComponents from on init', this.housingLocationComponents);
    this.initData();
  }

  ngAfterViewInit(): void {
    console.log('ViewChildren housingLocationComponents from on ngAfterViewInit', this.housingLocationComponents);
  }

  initData(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  handleOutput(house: HousingLocation): void {
    console.log('custom output with ', house)
  }

}
