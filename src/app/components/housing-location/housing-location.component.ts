import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../models/housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.scss'
})
export class HousingLocationComponent {
  // ! => no initializer
 @Input() house!: HousingLocation;
}
