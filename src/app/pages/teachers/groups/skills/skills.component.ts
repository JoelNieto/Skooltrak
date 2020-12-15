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
import { Skill, StudentSkill } from 'src/app/shared/models/skills.model';
import { Student } from 'src/app/shared/models/students.model';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass'],
})
export class SkillsComponent implements OnInit, OnChanges {
  @Input() student: Student;
  skills: Observable<Skill[]>;
  periods: Observable<Period[]>;
  items: Observable<StudentSkill[]>;
  constructor(
    private skillsService: SkillsService,
    private studentService: StudentsService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.periods = this.storage.getFromStorage(StorageEnum.Periods);
    this.skills = this.skillsService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.items = this.studentService.getSkills(this.student.id);
      }
    }
  }

  setValue(skill: StudentSkill, index: number) {
    if (!skill.periods.length) {
      this.periods.subscribe(periods => {
        periods.forEach(period => {

        });
      });
    }
  }

}
