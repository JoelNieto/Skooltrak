import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';

@Component({
  selector: 'skooltrak-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() student: Student;

  periods$: Observable<Period[]>;
  constructor(private periodService: PeriodsService) {}

  ngOnInit(): void {
    this.periods$ = this.periodService.getAll();
  }

  print() {}
}
