import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HousingLocation } from '../../models/housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.scss'
})
export class HousingLocationComponent {
  @Input()
  // ! => no initializer
  house!: HousingLocation;

  @Output()
  someOutput: EventEmitter<HousingLocation> = new EventEmitter();

  triggerOutput(): void {
    this.someOutput.emit(this.house);
  }
}
