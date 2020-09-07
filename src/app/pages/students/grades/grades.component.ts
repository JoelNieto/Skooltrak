import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Period } from 'src/app/shared/models/periods.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  $periods: Observable<Period[]>;
  $score: Observable<number>;
  constructor(
    public session: SessionService,
    private studentService: StudentsService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.$periods = this.storage.getFromStorage(StorageEnum.Periods);
    this.$score = this.studentService.getCurrentScore(
      this.session.currentStudent.id
    );
  }
}
