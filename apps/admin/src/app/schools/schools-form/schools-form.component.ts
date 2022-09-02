import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-schools-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './schools-form.component.html',
  styleUrls: ['./schools-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsFormComponent implements OnInit, OnDestroy {
  @Output() submitChanges = new EventEmitter<School>();
  form!: FormGroup;
  subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private readonly store: state.SchoolsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.selectedSchool$.subscribe({
        next: (school) => {
          this.form = this.fb.group({
            name: [school?.name, [Validators.required]],
            shortName: [school?.shortName, [Validators.required]],
            website: [school?.website],
            logoURL: [school?.logoURL],
            motto: [school?.motto],
            address: [school?.address],
            currentYear: [school?.currentYear],
          });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveChanges() {
    this.submitChanges.emit(this.form.value);
  }
}
