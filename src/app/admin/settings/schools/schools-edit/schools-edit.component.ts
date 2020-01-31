import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/schools.model';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schools-edit',
  templateUrl: './schools-edit.component.html',
  styleUrls: ['./schools-edit.component.sass']
})
export class SchoolsEditComponent implements OnInit {
  school$: Observable<School>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private schoolService: SchoolsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.school$ = this.schoolService.get(params.id);
    });
  }

  updateSchool(school: School) {
    this.schoolService.edit(school.id, school).subscribe(
      () => {
        Swal.fire(
          school.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('School')
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: Error) => {
        Swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }
}
