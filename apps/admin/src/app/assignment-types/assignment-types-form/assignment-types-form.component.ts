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
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-assignment-types-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
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
    color: new FormControl<'red' | 'yellow' | 'blue'>('blue', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private type: AssignmentType | undefined,
    private readonly dialog: MatDialogRef<AssignmentTypesFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.type);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }
}
