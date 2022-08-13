import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';
import { assignments_types } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-assignment-types-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './assignment-types-form.component.html',
  styleUrls: ['./assignment-types-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentTypesFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    summative: new FormControl<boolean>(false),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private type: AssignmentType | undefined,
    private readonly state: assignments_types.AssignmentTypesFacade,
    private readonly dialog: MatDialogRef<AssignmentTypesFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.type);
  }

  saveChanges() {
    const { value } = this.form;
    if (this.type) {
      this.state.edit(this.type._id, value);
    } else {
      this.state.create(value);
    }
    this.dialog.close();
  }
}
