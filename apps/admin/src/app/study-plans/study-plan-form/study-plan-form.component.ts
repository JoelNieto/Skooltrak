import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { StudyPlan, YearEnum } from '@skooltrak-app/models';
import { StudyPlanFormService } from './study-plan-form.service';
import { StudyPlanFormStore } from './study-plan-form.store';

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
  providers: [provideComponentStore(StudyPlanFormStore), StudyPlanFormService],
})
export class StudyPlanFormComponent implements OnInit {
  form!: FormGroup;

  schools$ = this.store.schools$;
  degrees$ = this.store.degrees$;
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
    private readonly store: StudyPlanFormStore
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
    let value: StudyPlan = this.form.getRawValue();

    value = { ...value, level: value.degree.level };
    value = { ...value, school: value.degree.school };

    this.dialog.close(value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
