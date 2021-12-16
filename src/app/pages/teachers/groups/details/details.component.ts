import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';

@Component({
  selector: 'skooltrak-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  students$: Observable<Student[]>;
  group$: Observable<ClassGroup>;
  plan$: Observable<StudyPlan>;
  selected: Student;
  constructor(
    private groupsService: ClassGroupsService,
    private studyPlansService: StudyPlanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.group$ = this.groupsService.get(params.id).pipe(
          tap((group) => {
            this.plan$ = this.studyPlansService.get(group.studyPlan.id);
          })
        );
        this.students$ = this.groupsService.getStudents(params.id);
      },
      (err) => console.error(err)
    );
  }
}
