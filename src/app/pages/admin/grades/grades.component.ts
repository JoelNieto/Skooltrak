import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { GradesReportsService } from 'src/app/shared/services/grades-reports.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesComponent implements OnInit {
  plans: Observable<StudyPlan[]>;
  plan: StudyPlan;
  groups: Observable<ClassGroup[]>;
  group: ClassGroup;
  students: Observable<Student[]>;
  student: Student;

  constructor(
    private groupsService: ClassGroupsService,
    private plansService: StudyPlanService,
    private gradesReports: GradesReportsService
  ) {}

  ngOnInit() {
    this.plans = this.plansService.getAll();
  }

  changePlan() {
    if (this.plan === null) {
      this.groups = this.groupsService.getAll();
    } else {
      this.groups = this.plansService.getGroups(this.plan.id);
    }
    this.group = null;
  }

  changeGroup() {
    if (this.group !== null) {
      this.students = this.groupsService.getStudents(this.group.id);
    }
  }

  async printReport() {
    const doc: any = await this.gradesReports.generatePDF(this.student.id);
    pdfMake
      .createPdf(
        doc,
        {},
        {
          // Default font should still be available
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf',
          },
          // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
          Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique',
          },
        },
        pdfFonts.pdfMake.vfs
      )
      .download(
        `${this.student.surname.toUpperCase()}_${this.student.firstName.toUpperCase()}.pdf`
      );
  }
}
