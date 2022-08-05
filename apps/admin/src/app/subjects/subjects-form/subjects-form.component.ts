import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from '@skooltrak-app/models';
import { subjects } from '@skooltrak-app/state';
import { map } from 'rxjs';

@Component({
  selector: 'skooltrak-subjects-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './subjects-form.component.html',
  styleUrls: ['./subjects-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsFormComponent implements OnInit {
  form!: FormGroup;
  subjects$ = this.state.allSubjects$;
  constructor(
    @Inject(MAT_DIALOG_DATA) private subject: Subject | undefined,
    private state: subjects.SubjectsFacade,
    private fb: FormBuilder,
    private dialog: MatDialogRef<SubjectsFormComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.subject?.name, [Validators.required]],
      shortName: [this.subject?.shortName, [Validators.required]],
      code: [this.subject?.code],
      parent: [this.subject?.parent],
    });

    if (this.subject) {
      this.subjects$ = this.subjects$.pipe(
        map((subjects) => subjects.filter((x) => x._id !== this.subject?._id))
      );
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  saveChanges() {
    if (this.subject) {
      this.state.edit(this.subject._id, this.form.value);
    } else {
      this.state.create(this.form.value);
    }
    this.dialog.close();
  }
}
