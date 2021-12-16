import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'skooltrak-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  group$: Observable<ClassGroup>;
  courses$: Observable<Course[]>;

  constructor(
    private route: ActivatedRoute,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.group$ = this.groupsService.get(params.id);
        this.courses$ = this.groupsService.getCourses(params.id);
      },
      (err) => console.error(err)
    );
  }
}
