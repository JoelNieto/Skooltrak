import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/schools.model';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-schools-edit',
  templateUrl: './schools-edit.component.html',
  styleUrls: ['./schools-edit.component.sass'],
})
export class SchoolsEditComponent implements OnInit {
  school$: Observable<School>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslocoService,
    private schoolService: SchoolsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.school$ = this.schoolService.get(params.id);
      },
      error: (err) => console.error(err),
    });
  }

  updateSchool(school: School) {
    this.schoolService.edit(school.id, school).subscribe({
      next: () => {
        Swal.fire(
          school.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('School'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      error: (err: Error) => {
        Swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }
}
