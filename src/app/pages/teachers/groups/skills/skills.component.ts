import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { School } from 'src/app/shared/models/schools.model';
import { Skill, StudentSkill } from 'src/app/shared/models/skills.model';
import { Student } from 'src/app/shared/models/students.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass'],
})
export class SkillsComponent implements OnInit, OnChanges {
  @Input() student: Student;
  skills$: Observable<Skill[]>;
  periods$: Observable<Period[]>;
  items$: Observable<StudentSkill[]>;
  school: School;
  constructor(
    private skillsService: SkillsService,
    private studentService: StudentsService,
    private transloco: TranslocoService,
    private session: SessionService,
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.periodsService.getAll();
    this.school = this.session.currentSchool;
    this.skills$ = this.skillsService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.getSkills();
      }
    }
  }

  getSkills() {
    this.items$ = this.studentService.getSkills(this.student.id);
  }

  setValue(skillId: string, periodId: string, value: string) {
    const currentYear = this.school.currentYear;
    this.skillsService
      .setSkill({
        studentId: this.student.id,
        year: currentYear,
        skillId,
        periodId,
        value,
      })
      .subscribe(
        () => {
          Swal.fire({
            title: 'Valor actualizado',
            icon: 'success',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
          });
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
  }
}
