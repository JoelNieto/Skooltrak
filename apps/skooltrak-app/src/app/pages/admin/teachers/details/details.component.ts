import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/shared/models/teachers.model';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'skooltrak-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  teacher$: Observable<Teacher>;
  constructor(
    private route: ActivatedRoute,
    private teacherServ: TeachersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.teacher$ = this.teacherServ.get(params.id);
      },
      error: (err) => console.error(err),
    });
  }
}
