import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Student } from '@skooltrak-app/models';
import { Subscription } from 'rxjs';

import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentsStore } from '../students.store';

@Component({
  selector: 'skooltrak-students-edit',
  standalone: true,
  imports: [CommonModule, StudentsFormComponent, RouterModule],
  template: ` <skooltrak-students-form
    (saveStudent)="updateStudent($event)"
  />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsEditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  private state = inject(StudentsStore);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.state.setSelected(id);
        },
      })
    );
  }

  updateStudent(request: Partial<Student>) {
    this.subscription.add(
      this.state.selectedId$.subscribe({
        next: (id) => {
          this.state.patchStudent({ id, request });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setSelected(undefined);
  }
}
