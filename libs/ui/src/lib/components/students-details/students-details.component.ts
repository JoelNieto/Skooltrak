import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';

import { LetModule } from '@ngrx/component';
import { Subject, takeUntil } from 'rxjs';
import { AgeDatePipe } from '../../pipes/age-date/age-date.pipe';
import { StudentNamePipe } from '../../pipes/student-name/student-name.pipe';
import { DescriptionItemComponent } from '../description-item/description-item.component';
import { StudentsDetailsService } from './students-details.service';
import { StudentsDetailsStore } from './students-details.store';

@Component({
  selector: 'skooltrak-students-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    DescriptionItemComponent,
    TranslateModule,
    StudentNamePipe,
    AgeDatePipe,
    MatButtonModule,
    LetModule,
    MatTabsModule,
    RouterModule,
  ],
  providers: [
    DatePipe,
    StudentsDetailsService,
    provideComponentStore(StudentsDetailsStore),
  ],
  template: `
    <ng-container
      *ngrxLet="student$ as student; complete as complete; suspenseTpl: loading"
    >
      <div class="row" *ngIf="student">
        <div class="col-lg-3">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{
                student | studentName: 'surname'
              }}</mat-card-title>
            </mat-card-header>
            <img mat-card-image [src]="student.profilePicURL" alt="" />
            <mat-card-content>
              <p>
                <span class="semibold-text"
                  >{{ 'Document ID' | translate }}:</span
                >
                {{ student.documentId }}
              </p>
              <p>
                <span class="semibold-text">{{ 'School' | translate }}:</span>
                {{ student.school.name }}
              </p>
              <p>
                <span class="semibold-text">{{ 'Degree' | translate }}:</span>
                {{ student.degree.name }}
              </p>
              <p>
                <span class="semibold-text">{{ 'Plan' | translate }}:</span>
                {{ student.plan.name }}
              </p>
              <p>
                <span class="semibold-text">{{ 'Group' | translate }}:</span>
                {{ student?.group?.name }}
              </p>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-lg-9">
          <mat-card>
            <div
              class="header-container d-flex align-items-center justify-content-between pe-3"
            >
              <mat-card-header>
                <mat-card-title>
                  {{ student | studentName: 'full-surname' }}
                </mat-card-title>
                <mat-card-subtitle>
                  {{ 'Created' | translate }}:
                  {{ student.createdAt | date: 'medium' }} /
                  {{ 'Last updated' | translate }}:
                  {{ student.updatedAt | date: 'medium' }}
                </mat-card-subtitle>
              </mat-card-header>
              <button
                *ngIf="(role$ | async) === 'admin'"
                mat-flat-button
                color="accent"
                [routerLink]="['/', 'students', 'edit']"
                [queryParams]="{ id: student._id }"
              >
                {{ 'Edit' | translate }}
              </button>
            </div>

            <mat-card-content>
              <div class="row">
                <div class="col-lg-3">
                  <skooltrak-description-item
                    [label]="'Birth date' | translate"
                    [value]="student.birthDate | ageDate: 'with_date'"
                  />
                </div>
                <div class="col-lg-3">
                  <skooltrak-description-item
                    [label]="'Gender' | translate"
                    [value]="student.gender | translate"
                  />
                </div>
                <skooltrak-description-item
                  class="col-lg-4"
                  [label]="'Address' | translate"
                  [value]="student.address"
                />
              </div>
              <mat-tab-group [dynamicHeight]>
                <mat-tab [label]="'Parents' | translate">
                  <mat-card class="my-4 mx-2">
                    <mat-card-header>
                      <mat-card-title>{{
                        'Mother info' | translate
                      }}</mat-card-title>
                    </mat-card-header>
                    <mat-card-content>
                      <div class="row">
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Name' | translate"
                          [value]="student.mother.name"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Email' | translate"
                          [value]="student.mother.email"
                        />
                        <skooltrak-description-item
                          class="col-lg-2"
                          [label]="'Phone number' | translate"
                          [value]="student.mother.phoneNumber"
                        />
                        <skooltrak-description-item
                          class="col-lg-2"
                          [label]="'Mobile number' | translate"
                          [value]="student.mother.mobileNumber"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Nationality' | translate"
                          [value]="student.mother.nationality"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Document ID' | translate"
                          [value]="student.mother.documentId"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Address' | translate"
                          [value]="student.mother.address"
                        />
                      </div>
                    </mat-card-content>
                  </mat-card>
                  <mat-card class="my-4 mx-2">
                    <mat-card-header>
                      <mat-card-title>{{
                        'Father info' | translate
                      }}</mat-card-title>
                    </mat-card-header>
                    <mat-card-content>
                      <div class="row">
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Name' | translate"
                          [value]="student.father.name"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Email' | translate"
                          [value]="student.father.email"
                        />
                        <skooltrak-description-item
                          class="col-lg-2"
                          [label]="'Phone number' | translate"
                          [value]="student.father.phoneNumber"
                        />
                        <skooltrak-description-item
                          class="col-lg-2"
                          [label]="'Mobile number' | translate"
                          [value]="student.father.mobileNumber"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Nationality' | translate"
                          [value]="student.father.nationality"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Document ID' | translate"
                          [value]="student.father.documentId"
                        />
                        <skooltrak-description-item
                          class="col-lg-4"
                          [label]="'Address' | translate"
                          [value]="student.father.address"
                        />
                      </div>
                    </mat-card-content>
                  </mat-card>
                </mat-tab>
                <mat-tab [label]="'Medical info' | translate">
                  <mat-card class="my-4 mx-2">
                    <mat-card-content>
                      <div class="row">
                        <skooltrak-description-item
                          class="col-md-4"
                          [label]="'Blood group' | translate"
                          [value]="student.medicalInfo.bloodGroup"
                        />
                        <skooltrak-description-item
                          class="col-md-4"
                          [label]="'Allergies' | translate"
                          [value]="student.medicalInfo.allergies"
                        />
                        <skooltrak-description-item
                          class="col-md-4"
                          [label]="'Medicine' | translate"
                          [value]="student.medicalInfo.medicine"
                        />
                        <skooltrak-description-item
                          class="col-md-6"
                          [label]="'Pediatrician' | translate"
                          [value]="student.medicalInfo.pediatrician"
                        />
                        <skooltrak-description-item
                          class="col-md-6"
                          [label]="'Hospital' | translate"

                          [value]="student.medicalInfo.hospital"
                        />
                      </div>
                    </mat-card-content>
                  </mat-card>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </ng-container>
    <ng-template #loading>
      <mat-progress-bar mode="query" #loading></mat-progress-bar>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {
  student$ = this.state.student$;
  role$ = this.authentication.role$;
  loading$ = this.state.loading$;
  destroy$: Subject<void> = new Subject();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly authentication: auth.AuthFacade,
    private readonly state: StudentsDetailsStore
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ id }) => {
        this.state.setId(id);
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
