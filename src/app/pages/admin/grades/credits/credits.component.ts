import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { CreditsService } from 'src/app/shared/services/credits.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.sass'],
})
export class CreditsComponent implements OnInit {
  students$!: Observable<Student[]>;
  student!: Student;
  selectedFormat!: { id: string; name: string };
  level!: string;

  formats = [
    { id: 'F', name: 'Modelo F' },
    { id: 'C', name: 'Modelo compacto' },
  ];

  levels = ['Primaria', 'Pre Media', 'Media'];
  constructor(
    private studentsService: StudentsService,
    private creditsService: CreditsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentsService.getAllStudents();
  }

  async generateReport(student: Student): Promise<void> {
    Swal.fire({
      title: 'Generando reporte',
      html: 'Espere un momento...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      if (this.selectedFormat.id === 'F') {
        const doc: any = await this.creditsService.generateFormatT(
          student.id,
          this.level
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
      } else {
        const doc: any = await this.creditsService.generateCompactFormat(
          student.id,
          this.level
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
      Swal.close();
    } catch (error) {
      Swal.fire(this.transloco.translate('Something went wrong'), '', 'error');
    }
  }
}
