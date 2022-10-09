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
import { Degree, LevelEnum } from '@skooltrak-app/models';
import { DegreesFormService } from './degrees-form.service';
import { DegreesFormStore } from './degrees-form.store';

@Component({
  selector: 'skooltrak-degrees-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './degrees-form.component.html',
  styleUrls: ['./degrees-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(DegreesFormStore), DegreesFormService],
})
export class DegreesFormComponent implements OnInit {
  form!: FormGroup;
  schools$ = this.store.schools$;
  levels = LevelEnum;
  constructor(
    private fb: FormBuilder,
    private store: DegreesFormStore,
    @Inject(MAT_DIALOG_DATA) private degree: Degree | undefined,
    private dialog: MatDialogRef<DegreesFormComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.degree?.name, [Validators.required]],
      level: [this.degree?.level, [Validators.required]],
      school: [this.degree?.school, [Validators.required]],
      active: [this.degree?.active ?? true],
    });
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
