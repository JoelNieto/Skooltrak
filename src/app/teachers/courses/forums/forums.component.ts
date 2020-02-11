import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Forum } from 'src/app/shared/models/forums.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ForumsService } from 'src/app/shared/services/forums.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.sass']
})
export class ForumsComponent implements OnInit {
  @Input() course: Course;

  forums: Observable<Forum[]>;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private coursesService: CoursesService,
    private forumsService: ForumsService,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.forums = this.coursesService.getForums(this.course.id);
  }

  openModal(content: any) {
    this.modal.open(content).result.then(value => {
      this.createForum(value);
    });
  }

  createForum(forum: Forum) {
    forum.course = this.course;
    this.forumsService.create(forum).subscribe(res => {
      Swal.fire(
        res.name,
        this.translate.instant('Created item', {
          value: this.translate.instant('Forum')
        }),
        'success'
      );
    });
  }

  gotoForum(id: string) {
    this.router.navigate(['/teachers', 'forums', id]);
  }
}
