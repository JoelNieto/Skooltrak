import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgModel,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { sortBy } from 'lodash';
import {
  BehaviorSubject,
  map,
  Observable,
  startWith,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

@Component({
  selector: 'skooltrak-country-selector',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
  template: `<mat-form-field>
    <mat-label>{{ 'Country' | translate }}</mat-label>
    <input matInput [matAutocomplete]="auto" [formControl]="countryCtrl" />
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option
        *ngFor="let country of filteredCountries$ | async"
        [value]="country.name.common"
      >
        <img class="country-img" [src]="country.flags.svg" height="25" />
        <span>{{ country.name.common }}</span>
      </mat-option>
    </mat-autocomplete>
  </mat-form-field> `,
  styles: [
    `
      .country-img {
        vertical-align: middle;
        margin-right: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectorComponent),
      multi: true,
    },
  ],
})
export class CountrySelectorComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  countryCtrl!: FormControl;
  countries$ = this.http
    .get<Country[]>('https://restcountries.com/v3.1/all?fields=name,flags')
    .pipe(map((countries) => sortBy(countries, ['name.common'])));
  filteredCountries$!: Observable<Country[]>;
  destroy$ = new BehaviorSubject(false);
  value = '';
  onChange: any = (val: any) => {};
  onTouched: any = () => {};
  constructor(
    private http: HttpClient,
    @Inject(Injector) private injector: Injector
  ) {}

  writeValue(obj: any): void {
    this.value = this.countryCtrl.value;
    this.onChange(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    const injectedControl = this.injector.get(NgControl);
    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;
        this.countryCtrl = control;
        this.countryCtrl.valueChanges
          .pipe(
            tap((value: string) => update.emit(value)),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.countryCtrl = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.countryCtrl = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }

    this.filteredCountries$ = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.countries$),
      map(([country, list]) =>
        country ? this._filterCountries(country, list) : list
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  private _filterCountries(value: string, countries: Country[]): Country[] {
    const filterValue = value.toLowerCase();
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterValue)
    );
  }
}

export interface Flags {
  png: string;
  svg: string;
}

export interface Spa {
  official: string;
  common: string;
}

export interface NativeName {
  spa: Spa;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface Country {
  flags: Flags;
  name: Name;
}
