import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { School } from 'src/app/shared/models/schools.model';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schools-new',
  templateUrl: './schools-new.component.html',
  styleUrls: ['./schools-new.component.sass']
})
export class SchoolsNewComponent implements OnInit {
  constructor(
    private schoolService: SchoolsService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  saveSchool(school: School) {
    this.schoolService.create(school).subscribe(
      res => {
        Swal.fire(
          school.name,
          this.translate.instant('Created item', {
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
