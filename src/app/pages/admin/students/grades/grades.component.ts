import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() student: Student;

  periods$: Observable<Period[]>;
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.periods$ = this.storage.getFromStorage(StorageEnum.Periods);
  }

  print() {}
}
