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

  // TODO: how to avoid data duplication (filteredLocationList / housingLocationList)
  filteredLocationList!: HousingLocations;

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

    // Use service mock to load data
    // this.initData();

    // Or use Http call
    this.initDataWithAPI();

    // Or use a more complex/precise mecanism
    // this.initDataWithSubject
  }

  ngAfterViewInit(): void {
    console.log('ViewChildren housingLocationComponents from on ngAfterViewInit', this.housingLocationComponents);
  }

  private initData(): void {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  private initDataWithAPI(): void {
    // /!\ we only handle next signals from observable so errors can be handle globally or in interceptor
    this.housingService.getAllHousingLocationsWithAPI()
      .subscribe((data: HousingLocations) => {
        this.housingLocationList = data;
      })
  }

  /**
   * Use an observable object from service
   * to handle data and modifications on it
   */
  initDataWithSubject() {
    this.housingService.housingLocationListSubject.subscribe( (data: HousingLocations) => {
      this.housingLocationList = data
      this.filteredLocationList = this.housingLocationList;
    })
  }

  handleOutput(house: HousingLocation): void {
    console.log('custom output with ', house)
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }

  // TODO: handle submit in a better to avoid page refresh
  handleSubmit(event: SubmitEvent, text: string) {
    event.preventDefault();
    event.stopPropagation();
    this.filterResults(text);
  }

}
