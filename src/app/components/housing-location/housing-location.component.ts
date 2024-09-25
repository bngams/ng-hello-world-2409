import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HousingLocation } from '../../models/housing-location';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

export enum HOUSE_DISPLAY_MODES {
  DETAILS,
  LIST,
}

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.scss'
})
export class HousingLocationComponent {
  @Input()
  // ! => no initializer
  house!: HousingLocation | undefined;

  //@Input() displayMode: HOUSE_DISPLAY_MODES = HOUSE_DISPLAY_MODES.PREVIEW;
  // TODO: use enum to handledisplayMode
  @Input() displayMode: string = 'list';


  @Output()
  someOutput: EventEmitter<HousingLocation> = new EventEmitter();

  triggerOutput(): void {
    this.someOutput.emit(this.house);
  }
}
