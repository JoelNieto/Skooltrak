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
import { Degree, LevelEnum } from '@skooltrak-app/models';
import { degrees as state } from '@skooltrak-app/state';

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
})
export class DegreesFormComponent implements OnInit {
  form!: FormGroup;
  schools$ = this.store.schools$;
  levels = LevelEnum;
  constructor(
    private fb: FormBuilder,
    private store: state.DegreesFacade,
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
    if (this.degree) {
      this.store.edit(this.degree._id, this.form.value);
    } else {
      this.store.create(this.form.value);
    }
    this.dialog.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
