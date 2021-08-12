import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { Reference } from 'src/app/shared/models/users.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() grade: Reference;
  @Input() group: ClassGroup;
  @Input() Assignment: Assignment;
  constructor() {}

  ngOnInit(): void {}
}
