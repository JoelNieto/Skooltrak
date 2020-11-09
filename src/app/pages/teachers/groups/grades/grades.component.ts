import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit, OnChanges {
  @Input() student: Student;
  $periods: Observable<Period[]>;
  $score: Observable<number>;
  constructor(
    private studentService: StudentsService,
    private storage: StorageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.$periods = this.storage.getFromStorage(StorageEnum.Periods);
        this.$score = this.studentService.getCurrentScore(this.student.id);
      }
    }
  }

  ngOnInit(): void {}

  getValues() {
    const array: string[][] = [];
    this.$periods.subscribe((periods) => {
      periods.forEach((period) => {
        array.push([period.name]);
      });
    });
  }
}
