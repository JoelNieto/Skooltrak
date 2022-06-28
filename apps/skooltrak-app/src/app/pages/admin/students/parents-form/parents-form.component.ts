import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/shared/models/countries.model';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'skooltrak-parents-form',
  templateUrl: './parents-form.component.html',
  styleUrls: ['./parents-form.component.sass'],
})
export class ParentsFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() parent: string;

  countries$: Observable<Country[]>;

  constructor(private countriesServ: CountriesService) {}

  ngOnInit(): void {
    this.countries$ = this.countriesServ.getAll();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
