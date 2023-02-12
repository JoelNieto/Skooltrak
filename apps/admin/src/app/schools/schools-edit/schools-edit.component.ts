import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { schools as state } from '@skooltrak-app/state';

import { SchoolsFormComponent } from '../schools-form/schools-form.component';

@Component({
  selector: 'skooltrak-schools-edit',
  standalone: true,
  imports: [CommonModule, SchoolsFormComponent],
  template: '<skooltrak-schools-form></skooltrak-schools-form>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsEditComponent implements OnInit {
  private store = inject(state.SchoolsFacade);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe({ next: ({ id }) => this.store.set(id) });
  }
}
