import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { admin_students } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

import { StudentsFormComponent } from '../students-form/students-form.component';

@Component({
  selector: 'skooltrak-students-edit',
  standalone: true,
  imports: [CommonModule, StudentsFormComponent, RouterModule],
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsEditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  constructor(
    private state: admin_students.StudentsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe({
        next: ({ id }) => {
          this.state.setStudent(id);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setStudent(undefined);
  }
}
