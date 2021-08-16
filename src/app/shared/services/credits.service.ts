import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CreditSummary, GroupedCredit } from '../models/credits.model';
import { FilesService } from './files.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class CreditsService {
  private url: string;
  constructor(
    private http: HttpClient,
    private studentsService: StudentsService,
    private filesService: FilesService,
    private session: SessionService
  ) {
    this.url = environment.urlAPI + 'credits';
  }

  public getCredits(documentId: string) {
    const params = new HttpParams().set('documentId', documentId);
    return this.http.get<GroupedCredit[]>(this.url, {
      params,
    });
  }

  public getSummary(documentId: string) {
    const params = new HttpParams().set('documentId', documentId);
    return this.http.get<CreditSummary[]>(`${this.url}/Summary`, {
      params,
    });
  }

  async generatePDF(studentId: string) {
    const student = await this.studentsService.get(studentId).toPromise();
    const credits = await this.getCredits(student.documentId).toPromise();
    const summary = await this.getSummary(student.documentId).toPromise();

    const summaryTable = {
      margin: 20,
      table: {
        headerRows: 1,
        fontSize: 10,
        body: [
          [
            { text: 'CENTRO EDUCATIVO', fontSize: 10, bold: true },
            { text: 'DISTRITO', fontSize: 10, bold: true },
            { text: 'REGIÓN EDUCATIVA', fontSize: 10, bold: true },
            { text: 'GRADO', fontSize: 10, bold: true },
            { text: 'PROMEDIO', fontSize: 10, bold: true },
            { text: 'PERIODO ESCOLAR', fontSize: 10, bold: true },
          ],
        ],
      },
    };

    summary.forEach((year) => {
      const item: any[] = [
        { text: this.session.currentSchool.shortName, fontSize: 10 },
        { text: 'Panamá', fontSize: 10 },
        { text: 'Panamá Centro', fontSize: 10 },
        { text: year.year.level, fontSize: 10 },
        { text: year.grades.toFixed(1).toString(), fontSize: 10 },
        { text: year.year.year.toString(), fontSize: 10 },
      ];
      summaryTable.table.body.push(item);
    });

    for (let i = 0; i < 6 - summary.length; i++) {
      const item: any[] = [
        { text: ' ', fontSize: 10 },
        { text: ' ', fontSize: 10 },
        { text: ' ', fontSize: 10 },
        { text: ' ', fontSize: 10 },
        { text: ' ', fontSize: 10 },
        { text: ' ', fontSize: 10 },
      ];
      summaryTable.table.body.push(item);
    }
    const logo = await this.filesService.getBase64ImageFromURL(
      '/assets/img/meduca-logo.png'
    );

    const cover = {
      columns: [
        {
          stack: [
            {
              fontSize: 8,
              table: {
                headerRows: 1,
                widths: [70, 70, 70, 70, 70],
                body: [
                  [
                    {
                      fontSize: 11,
                      text: 'RELACIÓN CON EL HOGAR',
                      colSpan: 5,
                      alignment: 'center',
                    },
                    '',
                    '',
                    '',
                    '',
                  ],
                  [
                    {
                      text: 'VISITAS (Totales)',
                      colSpan: 3,
                      alignment: 'center',
                    },
                    '',
                    '',
                    {
                      text: 'Reunión de Padres de Familia (Parciales y Generales)',
                      colSpan: 2,
                      alignment: 'center',
                    },
                    '',
                  ],
                  [
                    { text: 'PERIODO ESCOLAR', alignment: 'center' },
                    { text: 'DEL ACUDIENTE', alignment: 'center' },
                    { text: 'DEL DOCENTE', alignment: 'center' },
                    { text: 'REALIZADOS', alignment: 'center' },
                    { text: 'ASISTIÓ', alignment: 'center' },
                  ],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                  [' ', ' ', ' ', ' ', ' '],
                ],
              },
            },
            {
              margin: [0, 20],
              table: {
                headerRows: 2,
                widths: [386],
                body: [
                  [{ fontSize: 13, text: 'COMENTARIOS', alignment: 'center' }],
                  [{ fontSize: 11, text: 'DEL DOCENTE', alignment: 'center' }],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                  [' '],
                ],
              },
            },
          ],
        },
        {
          alignment: 'center',
          fontSize: 15,
          stack: [
            { image: logo, width: 160, margin: [0, 20] },
            { text: 'MINISTERIO DE EDUCACIÓN', bold: true },
            { text: 'DIRECCIÓN NACIONAL DE EDUCACIÓN PARTICULAR', bold: true },
            { text: this.session.currentSchool.name.toUpperCase(), bold: true },
            {
              text: 'REGISTRO ACUMULATIVO',
              decoration: 'underline',
              margin: [0, 20],
            },
            {
              text: student.fullName,
              fontSize: 20,
              bold: true,
              italics: true,
              decoration: 'underline',
            },
            {
              text: [
                'CÉDULA DE IDENTIDAD PERSONAL: ',
                {
                  text: student.documentId,
                  bold: true,
                  decoration: 'underline',
                },
              ],
              fontSize: 12,
              margin: 10,
            },
            summaryTable,
          ],
        },
      ],
      pageBreak: 'after',
    };

    const gradesTable = {
      table: {
        headerRows: 1,
        fontSize: 10,
        body: [],
      },
    };
    let headerRow: any = [{ text: 'PERÍODO ESCOLAR', fontSize: 8, bold: true }];
    summary.forEach((year, index) => {
      headerRow.push({
        text: year.year.year.toString(),
        colSpan: 3,
        fontSize: 8,
        bold: true,
      });
      headerRow.push('');
      headerRow.push('');
      headerRow.push({ text: 'NOTA FINAL', fontSize: 8, bold: true });
    });

    gradesTable.table.body.push(headerRow);

    headerRow = [{ text: 'ASIGNATURA', fontSize: 8, bold: true }];
    summary.forEach((year, index) => {
      headerRow.push({ text: '1', fontSize: 8 });
      headerRow.push({ text: '2', fontSize: 8 });
      headerRow.push({ text: '3', fontSize: 8 });
      headerRow.push('');
    });
    gradesTable.table.body.push(headerRow);

    credits.forEach((credit) => {
      const row: any[] = [
        { text: credit.subject, alignment: 'left', fontSize: 8 },
      ];
      summary.forEach((year, index) => {
        const currentYear = credit.grades.filter(
          (x) => x.year === year.year.year
        );
        if (currentYear.length) {
          currentYear.forEach((grade) => {
            row.push({ text: grade.grade.toFixed(1), fontSize: 8 });
          });
          const average = this.avg(currentYear.map((x) => x.grade));
          row.push({ text: average, fontSize: 8, bold: true });
        } else {
          row.push('');
          row.push('');
          row.push('');
          row.push('');
        }
      });
      gradesTable.table.body.push(row);
    });

    const totalRow: any = [{ text: 'NOTA FINAL', bold: true, fontSize: 9 }];

    summary.forEach((year) => {
      totalRow.push('');
      totalRow.push('');
      totalRow.push('');
      totalRow.push({ text: year.grades.toFixed(2), bold: true, fontSize: 9 });
    });
    gradesTable.table.body.push(totalRow);

    const grades = {
      alignment: 'center',
      stack: [
        {
          text: 'HISTORIAL DE CALIFICACIONES',
          bold: true,
          fontSize: 12,
          margin: [0, 20],
          alignment: 'left',
        },
        gradesTable,
      ],
    };

    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LEGAL',
      pageMargins: [20, 20, 20, 15],
      pageOrientation: 'landscape',
      content: [cover, grades],
    };
  }

  avg(values: number[]) {
    if (values.length) {
      return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    }
  }
}
