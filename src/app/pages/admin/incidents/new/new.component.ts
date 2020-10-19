import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Incident } from 'src/app/shared/models/incidents.model';
import { IncidentsService } from 'src/app/shared/services/incidents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass'],
})
export class NewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incidentsService: IncidentsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {}

  createReport(incident: Incident) {
    this.incidentsService.create(incident).subscribe(
      (res) => {
        Swal.fire(
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Incident'),
          }),
          res.title,
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wring'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }
}
