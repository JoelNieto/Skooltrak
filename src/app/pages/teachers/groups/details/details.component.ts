import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  students: Observable<Student[]>;
  $group: Observable<ClassGroup>;
  selected: Student;
  constructor(
    private groupsService: ClassGroupsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.$group = this.groupsService.get(params.id);
      this.students = this.groupsService.getStudents(params.id);
    });
  }
}
