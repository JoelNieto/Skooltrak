import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-schools-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ 'School data' | translate }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <div class="col-7">
              <mat-form-field>
                <mat-label>{{ 'Name' | translate }}</mat-label>
                <input type="text" matInput formControlName="name" />
              </mat-form-field>
            </div>
            <div class="col-5">
              <mat-form-field>
                <mat-label>{{ 'Short name' | translate }}</mat-label>
                <input type="text" formControlName="shortName" matInput />
              </mat-form-field>
            </div>
            <div class="col-6">
              <mat-form-field>
                <mat-label>{{ 'Website' | translate }}</mat-label>
                <input type="url" formControlName="website" matInput />
              </mat-form-field>
            </div>
            <div class="col-6">
              <mat-form-field>
                <mat-label>{{ 'Current year' | translate }}</mat-label>
                <mat-select formControlName="currentYear">
                  <mat-option [value]="2020">2020</mat-option>
                  <mat-option [value]="2021">2021</mat-option>
                  <mat-option [value]="2022">2022</mat-option>
                  <mat-option [value]="2023">2023</mat-option>
                  <mat-option [value]="2024">2024</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="col-6">
              <mat-form-field>
                <mat-label>{{ 'Motto' | translate }}</mat-label>
                <input type="text" formControlName="motto" matInput />
              </mat-form-field>
            </div>
            <div class="col-12">
              <mat-form-field>
                <mat-label>{{ 'Address' | translate }}</mat-label>
                <textarea matInput formControlName="address"></textarea>
              </mat-form-field>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button
            type="submit"
            mat-flat-button
            color="primary"
            [disabled]="form.invalid"
          >
            {{ 'Save' | translate }}
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsFormComponent implements OnInit, OnDestroy {
  @Output() submitChanges = new EventEmitter<School>();
  form!: FormGroup;
  subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private readonly store: state.SchoolsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.selectedSchool$.subscribe({
        next: (school) => {
          this.form = this.fb.group({
            name: [school?.name, [Validators.required]],
            shortName: [school?.shortName, [Validators.required]],
            website: [school?.website],
            logoURL: [school?.logoURL],
            motto: [school?.motto],
            address: [school?.address],
            currentYear: [school?.currentYear],
          });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveChanges() {
    this.submitChanges.emit(this.form.value);
  }
}
