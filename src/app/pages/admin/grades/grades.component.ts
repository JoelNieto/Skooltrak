import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { GradesReportsService } from 'src/app/shared/services/grades-reports.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesComponent implements OnInit {
  plans: Observable<StudyPlan[]>;
  plan: StudyPlan;
  periods: Observable<Period[]>;
  period: Period;
  groups: Observable<ClassGroup[]>;
  group: ClassGroup;
  students: Observable<Student[]>;
  student: Student;

  constructor(
    private groupsService: ClassGroupsService,
    private plansService: StudyPlanService,
    private gradesReports: GradesReportsService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.plans = this.plansService.getAll();
    this.periods = this.storage.getFromStorage(StorageEnum.Periods);
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

  printGroup() {
    this.students.subscribe((items) => {
      let currentReport = 1;
      Swal.fire({
        title: 'Generando reportes...',
        html: `1 de ${currentReport}`,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      items.forEach(async (student) => {
        await this.generateReport(student);
        currentReport++;
      });
      Swal.close();
    });
  }

  async generateReport(student: Student) {
    const doc: any = await this.gradesReports.generatePDF(
      student.id,
      this.period
    );
    pdfMake
      .createPdf(
        doc,
        {},
        {
          // Default font should still be available
          Inter: {
            normal: window.location.origin + '/Inter-Regular.ttf',
            bold: window.location.origin + '/Inter-SemiBold.ttf',
            italics: window.location.origin + '/Inter-Regular.ttf',
            bolditalics: window.location.origin + '/Inter-Bold.ttf',
          },
          // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
          TimesNewRoman: {
            normal: 'Times-New-Roman-Regular.ttf',
            bold: 'Times-New-Roman-Bold.ttf',
            italics: 'Times-New-Roman-Italics.ttf',
            bolditalics: 'Times-New-Roman-Italics.ttf',
          },
        },
        pdfFonts.pdfMake.vfs
      )
      .download(
        `${student.surname.toUpperCase()}_${student.firstName.toUpperCase()}.pdf`
      );
  }

  async printReport() {
    if (this.student) {
      Swal.fire({
        title: 'Generando reporte',
        html: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const doc: any = await this.gradesReports
        .generatePDF(this.student.id, this.period)
        .catch(() => {
          Swal.fire({
            title: 'Ocurrió un error',
            text: 'Intente otra vez',
            icon: 'error',
          });
        });
      pdfMake
        .createPdf(
          doc,
          {},
          {
            // Default font should still be available
            Inter: {
              normal: window.location.origin + '/Inter-Regular.ttf',
              bold: window.location.origin + '/Inter-SemiBold.ttf',
              italics: window.location.origin + '/Inter-Regular.ttf',
              bolditalics: window.location.origin + '/Inter-Bold.ttf',
            },
            // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
            TimesNewRoman: {
              normal: 'Times-New-Roman-Regular.ttf',
              bold: 'Times-New-Roman-Bold.ttf',
              italics: 'Times-New-Roman-Italics.ttf',
              bolditalics: 'Times-New-Roman-Italics.ttf',
            },
          },
          pdfFonts.pdfMake.vfs
        )
        .print();
      Swal.close();
    }
  }
}
