import { Component } from '@angular/core';
import { HousingLocationComponent } from "../../components/housing-location/housing-location.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
