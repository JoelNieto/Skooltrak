import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Student, StudentGrade } from '@skooltrak-app/models';
import { DecimalScoreDirective } from '../../directives';
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
  providers: [StudentGradeService],
  template: `<button
      mat-button
      [matMenuTriggerFor]="menu"
      #trigger="matMenuTrigger"
    >
      {{ item?.score ?? 'NA' }}
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
export class StudentGradeComponent {
  @Input() student!: Student;
  @Input() grade!: Grade;
  @Input() item: StudentGrade | undefined;

  scoreControl = new FormControl<string | null>('4.0', {
    validators: [Validators.max(5), Validators.min(1)],
  });

  private service = inject(StudentGradeService);

  saveGrade() {
    const score = Number(this.scoreControl.getRawValue()) ?? null;
    this.service
      .setGrade({ student: this.student._id, grade: this.grade._id }, score)
      .subscribe({
        next: (payload) => {},
      });
  }
}
