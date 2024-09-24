import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  housingLocationId!: number;

  constructor() {
      this.housingLocationId = Number(this.route.snapshot.params['id']);
  }
}
