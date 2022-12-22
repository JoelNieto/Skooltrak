/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Student } from '@skooltrak-app/models';
import { filter, map, tap } from 'rxjs';
import { DecimalScoreDirective } from '../../directives';
import { GradesPageStore } from '../grades-page/grades-page.store';
import { StudentGradeService } from './student-grade.service';

@Component({
  selector: 'skooltrak-student-grade',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    DecimalScoreDirective,
  ],
  providers: [StudentGradeService, DecimalPipe],
  template: `<button
      mat-button
      [color]="color"
      [matMenuTriggerFor]="menu"
      #trigger="matMenuTrigger"
    >
      {{ (display$ | async) ?? 'NA' }}
    </button>
    <mat-menu #menu="matMenu" class="menu-form-wrapper">
      <div
        (click)="$event.stopPropagation()"
        (keydown)="$event.stopPropagation()"
      >
        <div class="menu-form">
          <mat-form-field>
            <mat-label>{{ 'Score' | translate }}</mat-label>
            <input
              matInput
              type="text"
              [formControl]="scoreControl"
              decimalScore
            />
            <mat-error *ngIf="scoreControl.errors">Invalid score</mat-error>
          </mat-form-field>
          <span>
            <button mat-button (click)="trigger.toggleMenu()">
              {{ 'Cancel' | translate }}
            </button>
            &nbsp;
            <button
              mat-flat-button
              color="primary"
              [disabled]="scoreControl.invalid"
              (click)="saveGrade()"
            >
              {{ 'Save' | translate }}
            </button>
          </span>
        </div>
      </div>
    </mat-menu> `,
  styles: [
    `
      :host {
        display: block;
      }

      .menu-form-wrapper .mat-menu-content:not(:empty) {
        padding: 0;
      }

      .menu-form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGradeComponent implements OnInit {
  @Input() student!: Student;
  @Input() grade!: Grade;
  @Output() saveChanges = new EventEmitter();

  @ViewChild(MatMenuTrigger) private menu!: MatMenuTrigger;

  scoreControl = new FormControl<string | null>(null, {
    validators: [Validators.max(5), Validators.min(1)],
  });

  public color: 'warn' | 'accent' | 'basic' = 'basic';
  private store = inject(GradesPageStore);
  private decimal = inject(DecimalPipe);

  item$ = this.store.scores$.pipe(
    map((scores) =>
      scores.find(
        (x) =>
          x.student._id === this.student._id && x.grade._id === this.grade._id
      )
    ),
    filter((score) => !!score),
    tap((value) =>
      this.scoreControl.patchValue(
        this.decimal.transform(value?.score, '1.1-1')
      )
    )
  );

  display$ = this.item$.pipe(
    map((value) =>
      value?.score ? this.decimal.transform(value.score, '1.1-1') : 'NA'
    )
  );

  private service = inject(StudentGradeService);

  ngOnInit(): void {
    this.item$.pipe(filter((grade) => !!grade?.score)).subscribe({
      next: (grade) => {
        this.color = grade!.score < 3 ? 'warn' : this.color;
        this.color = grade!.score >= 4.5 ? 'accent' : this.color;
      },
    });
  }

  saveGrade() {
    const score = Number(this.scoreControl.getRawValue()) ?? null;
    this.service
      .setGrade({ student: this.student._id, grade: this.grade._id }, score)
      .subscribe({
        next: () => {
          this.saveChanges.emit();
          this.menu.toggleMenu();
        },
      });
  }
}
