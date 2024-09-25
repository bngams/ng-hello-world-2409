import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../models/housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  // DI with inject function or with construcor?
  // if we want to keep some elements private => prefer constructor DI
  // /!\ if private => how to mock / test ?
  /* private */ route: ActivatedRoute = inject(ActivatedRoute);
  /* private */ housingService = inject(HousingService);
  house: HousingLocation | undefined ;

  ngOnInit(): void {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.house = this.housingService.getHousingLocationById(housingLocationId);
  }
}
