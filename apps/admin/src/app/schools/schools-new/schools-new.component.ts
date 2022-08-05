import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';

import { SchoolsFormComponent } from '../schools-form/schools-form.component';

@Component({
  selector: 'skooltrak-schools-new',
  standalone: true,
  imports: [CommonModule, SchoolsFormComponent],
  templateUrl: './schools-new.component.html',
  styleUrls: ['./schools-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsNewComponent implements OnInit {
  constructor(private store: state.SchoolsFacade) {}

  ngOnInit(): void {}

  createSchool(school: School) {
    console.log('new component');
    this.store.create(school);
  }
}
