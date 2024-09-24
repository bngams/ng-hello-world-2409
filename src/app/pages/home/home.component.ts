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
  // Another DI pattern with inject() function
  // private housingService: HousingService = inject(HousingService);

  // ViewChildren(<selector>)
  @ViewChildren(HousingLocationComponent)
  housingLocationComponents!: QueryList<HousingLocationComponent>;

  // DI with constructor (pattern constructor TS portee nom : type )
  constructor(private housingService: HousingService) {
    // TS Do: this.housingService = housingService;
    console.log('ViewChildren housingLocationComponents from constructor', this.housingLocationComponents);
    // this.initData(); // prefer in ngOnInit (for now seems compliant in constructor but ...)
  }

  ngOnInit(): void {
    console.log('ViewChildren housingLocationComponents from on init', this.housingLocationComponents);
    this.initData();
    // Or use a more complex/precise mecanism
    // this.initDataWithSubject
  }

  ngAfterViewInit(): void {
    console.log('ViewChildren housingLocationComponents from on ngAfterViewInit', this.housingLocationComponents);
  }

  initData(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  /**
   * Use an observable object from service
   * to handle data and modifications on it
   */
  initDataWithSubject() {
    this.housingService.housingLocationListSubject.subscribe( (data: HousingLocations) => {
      this.housingLocationList = data
    })
  }

  handleOutput(house: HousingLocation): void {
    console.log('custom output with ', house)
  }

}
