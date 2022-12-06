import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';

import { SchoolsFormComponent } from '../schools-form/schools-form.component';

@Component({
  selector: 'skooltrak-schools-new',
  standalone: true,
  imports: [CommonModule, SchoolsFormComponent],
  template: `
    <skooltrak-schools-form
      (submitChanges)="createSchool($event)"
    ></skooltrak-schools-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsNewComponent {
  constructor(private store: state.SchoolsFacade) {}

  createSchool(school: School) {
    this.store.create(school);
  }
}
