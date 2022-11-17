import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Student, StudentGrade } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  hasNumber = false;
  public numberValue?: number;
  valueControl = new FormControl<number | null>(null, {
    validators: [Validators.min(1), Validators.max(5)],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private modalRef: { student: Student; grade: Grade; item: StudentGrade }
  ) {}

  ngOnInit(): void {
    this.valueControl.markAsDirty();
    this.modalRef.item &&
      this.valueControl.patchValue(this.modalRef.item.score);
  }
}
