import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Period, School } from '@skooltrak-app/models';
import { PeriodsFormService } from './periods-form.service';
import { PeriodsFormStore } from './periods-form.store';

@Component({
  selector: 'skooltrak-periods-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
  ],
  templateUrl: './periods-form.component.html',
  providers: [PeriodsFormService, provideComponentStore(PeriodsFormStore)],
  styleUrls: ['./periods-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodsFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    sort: new FormControl<number>(1, { validators: [Validators.required] }),
    school: new FormControl<School>(undefined, {
      validators: [Validators.required],
    }),
    startDate: new FormControl<Date>(undefined),
    endDate: new FormControl<Date>(undefined),
  });
  schools$ = this.store.schools$;
  constructor(
    @Inject(MAT_DIALOG_DATA) private period: Period,
    private store: PeriodsFormStore,
    private dialog: MatDialogRef<PeriodsFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.period);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
