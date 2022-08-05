import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'skooltrak-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalScoreComponent implements OnChanges {
  @Input() course: Course;
  students$: Observable<Student[]>;
  constructor(private coursesService: CoursesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.course && this.course) {
      this.students$ = this.coursesService.getStudents(this.course.id);
    }
  }
}
