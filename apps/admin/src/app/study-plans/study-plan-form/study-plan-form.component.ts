import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { StudyPlan, YearEnum } from '@skooltrak-app/models';
import { plans } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-study-plan-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  templateUrl: './study-plan-form.component.html',
  styleUrls: ['./study-plan-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlanFormComponent implements OnInit {
  form!: FormGroup;

  schools$ = this.state.schools$;
  degrees$ = this.state.degrees$;
  years = Object.keys(YearEnum).map((name) => {
    return {
      name,
      value: YearEnum[name as keyof typeof YearEnum],
    };
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private plan: StudyPlan | undefined,
    private readonly dialog: MatDialogRef<StudyPlanFormComponent>,
    private readonly fb: FormBuilder,
    private readonly state: plans.StudyPlansFacade
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.plan?.name, [Validators.required]],
      degree: [this.plan?.degree, [Validators.required]],
      active: [this.plan?.active ?? true, []],
      year: [this.plan?.year, [Validators.required]],
    });
  }

  saveChanges(): void {
    const value: StudyPlan = this.form.getRawValue();
    value.level = value.degree.level;
    value.school = value.degree.school;
    if (this.plan) {
      this.state.edit(this.plan._id, value);
    } else {
      this.state.create(value);
    }
    this.dialog.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
