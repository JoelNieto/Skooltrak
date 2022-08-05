import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { schools as state } from '@skooltrak-app/state';

import { SchoolsFormComponent } from '../schools-form/schools-form.component';

@Component({
  selector: 'skooltrak-schools-edit',
  standalone: true,
  imports: [CommonModule, SchoolsFormComponent],
  templateUrl: './schools-edit.component.html',
  styleUrls: ['./schools-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsEditComponent implements OnInit {
  constructor(
    private store: state.SchoolsFacade,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({ next: ({ id }) => this.store.set(id) });
  }
}
