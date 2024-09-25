import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../models/housing-location';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HousingLocationComponent } from "../../components/housing-location/housing-location.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HousingLocationComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  // DI with inject function or with constructor?
  // if we want to keep some elements private => prefer constructor DI
  // /!\ if private => how to mock / test ?
  /* private */ route: ActivatedRoute = inject(ActivatedRoute);
  /* private */ router: Router = inject(Router);
  /* private */ housingService = inject(HousingService);
  house!: HousingLocation | undefined;

  applyForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  private initData(): void {
    // /!\ need to cast on exec (TS doesn't rely logic on exec)
    const housingLocationId = Number(this.route.snapshot.params['id']);
    // /!\ how to handle errors ? (for instance redirect...)
    this.house = this.housingService.getHousingLocationById(housingLocationId);
    // handle redirect
    if(this.house === undefined) {
      this.router.navigateByUrl('/404')
    } else {
      // TODO: how to handle logic if needs house info?
      // 1) this.initForm(this.house.id)
      // 2) this.initForm();
      // 3) if form is initialized...
      //    this.applyForm.addControl('houseId', new FormControl(this.house.id));
      // 4)  another component <app-apply-form [houseId]="house.id"></app-apply-form>
    }
  }

  private initForm(): void {
    this.applyForm = new FormGroup({
      // TODO: how to handle logic if needs house info?
      // houseId: new FormControl(this.house?.id),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]), // possible with custom validators f()...
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
