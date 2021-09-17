import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { School } from 'src/app/shared/models/schools.model';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schools-new',
  templateUrl: './schools-new.component.html',
  styleUrls: ['./schools-new.component.sass'],
})
export class SchoolsNewComponent {
  constructor(
    private schoolService: SchoolsService,
    private translate: TranslocoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveSchool(school: School) {
    this.schoolService.create(school).subscribe(
      (res) => {
        Swal.fire(
          school.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('School'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: Error) => {
        Swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      }
    );
  }
}
