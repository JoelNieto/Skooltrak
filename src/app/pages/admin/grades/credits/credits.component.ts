import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { CreditsService } from 'src/app/shared/services/credits.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.sass'],
})
export class CreditsComponent implements OnInit {
  students$: Observable<Student[]>;
  student: Student;
  selectedFormat: { id: string; name: string };

  formats = [
    { id: 'F', name: 'Modelo F' },
    { id: 'C', name: 'Modelo compacto' },
  ];
  constructor(
    private studentsService: StudentsService,
    private creditsService: CreditsService
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentsService.getAllStudents();
  }

  async generateReport(student: Student) {
    if (this.selectedFormat.id === 'F') {
      const doc: any = await this.creditsService.generateFormatT(student.id);
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
        .open();
    } else {
      const doc: any = await this.creditsService.generateCompactFormat(
        student.id
      );
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
        .open();
    }
  }
}
