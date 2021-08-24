import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CreditSummary, GroupedCredit } from '../models/credits.model';
import { FilesService } from './files.service';
import { SchoolsService } from './schools.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';
import { StudyPlanService } from './study-plans.service';

@Injectable({ providedIn: 'root' })
export class CreditsService {
  private url: string;
  constructor(
    private http: HttpClient,
    private studentsService: StudentsService,
    private filesService: FilesService,
    private schoolsService: SchoolsService,
    private planService: StudyPlanService,
    private session: SessionService
  ) {
    this.url = environment.urlAPI + 'credits';
  }

  public getCredits(
    documentId: string,
    level: string
  ): Observable<GroupedCredit[]> {
    const params = new HttpParams()
      .append('documentId', documentId)
      .append('type', level);
    return this.http.get<GroupedCredit[]>(this.url, {
      params,
    });
  }

  public getSummary(
    documentId: string,
    level: string
  ): Observable<CreditSummary[]> {
    const params = new HttpParams()
      .append('documentId', documentId)
      .append('type', level);
    return this.http.get<CreditSummary[]>(`${this.url}/Summary`, {
      params,
    });
  }

  async generateCompactFormat(studentId: string, level: string): Promise<any> {
    const date = new Date();
    const student = await this.studentsService.get(studentId).toPromise();
    const credits = await this.getCredits(
      student.documentId,
      level
    ).toPromise();
    const summary = await this.getSummary(
      student.documentId,
      level
    ).toPromise();
    const logo = await this.filesService.getBase64ImageFromURL(
      this.schoolsService.getLogo(this.session.currentSchool)
    );
    const header = {
      columns: [
        {
          stack: [
            {
              image: logo,
              width: 60,
            },
          ],
        },
        {
          margin: [0, 5, 0, 0],
          stack: [
            'REPUBLICA DE PANAMÁ',
            'MINISTERIO DE EDUCACIÓN',
            this.session.currentSchool.name.toUpperCase(),
            'REGISTRO ACADÉMICO',
          ],
          alignment: 'center',
          bold: true,
          fontSize: 10,
        },
        {
          text: '',
          margin: [20, 20],
          width: 175,
          fontSize: 8,
          alignment: 'right',
        },
      ],
      margin: [20, 10, 20, 10],
    };

    const info = {
      fontSize: 10,
      stack: [
        {
          columns: [
            {
              text: [
                { text: 'ESTUDIANTE:', bold: true },
                '  ',
                student.shortName.toUpperCase(),
              ],
            },
            {
              text: [{ text: 'CÉDULA:', bold: true }, '  ', student.documentId],
            },
          ],
        },
        {
          columns: [
            {
              text: [{ text: 'SECCIÓN: ', bold: true }, level.toUpperCase()],
            },
            {
              text: [
                { text: 'FECHA DE EXPEDICIÓN: ', bold: true },
                format(date, "d 'de' MMMM 'de' yyyy", { locale: es }),
              ],
            },
          ],
        },
      ],
    };

    const table = {
      fontSize: 8,
      table: {
        headerRows: 1,
        body: [],
      },
    };

    let headerRow: any[] = [
      { text: 'N', bold: true },
      { text: 'ASIGNATURAS', bold: true, width: 200 },
    ];

    summary.forEach((year) => {
      headerRow.push({
        text: year.year.year.toString(),
        colSpan: 2,
        alignment: 'center',
        bold: true,
      });
      headerRow.push('');
    });

    table.table.body.push(headerRow);
    headerRow = ['', ''];
    summary.forEach((year) => {
      headerRow.push({
        text: year.year.level,
        colSpan: 2,
        bold: true,
        alignment: 'center',
      });
      headerRow.push('');
    });

    table.table.body.push(headerRow);

    headerRow = [{ text: '' }, { text: '' }];
    summary.forEach((year) => {
      headerRow.push({
        text: 'H.C.',
        bold: true,
        alignment: 'center',
      });
      headerRow.push({
        text: 'P.F.',
        bold: true,
        alignment: 'center',
      });
    });

    table.table.body.push(headerRow);

    credits.forEach((credit, index) => {
      const row: any[] = [
        { text: (index + 1).toString() },
        { text: credit.subject, alignment: 'left' },
      ];
      summary.forEach((year) => {
        const currentYear = credit.grades.filter(
          (x) => x.year === year.year.year
        );
        if (currentYear.length) {
          row.push('');
          const average = this.avg(currentYear.map((x) => x.grade));
          row.push({ text: average, bold: true, alignment: 'center' });
        } else {
          row.push('');
          row.push('');
        }
      });
      table.table.body.push(row);
    });
    const data = {
      margin: [0, 20, 0, 0],
      stack: [
        {
          text: 'CRÉDITOS OFICIALES',
          fontSize: 10,
          alignment: 'center',
          italics: true,
          margin: [0, 0, 0, 10],
        },
        table,
      ],
    };
    const message = {
      margin: [0, 5],
      fontSize: 11,
      stack: [
        {
          text: 'Las calificación máxima es de 5.0 y la mínima es de 1.0. La nota mínima de promoción es tres (3.0).',
        },
        { text: 'H.C. Hora de clases, P.F. Promedio Final.' },
        {
          bold: true,
          text: 'No son válidos sin el sello y firma de la dirección'.toUpperCase(),
        },
        {
          text: [
            { text: 'Observaciones: ', bold: true },
            {
              text: 'Durante su permanencia en el plantel el estudiante observó conducta regular.',
            },
          ],
        },
        {
          text: 'Director (a)',
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
        {
          text: this.session.currentSchool.motto,
          alignment: 'center',
          bold: true,
        },
      ],
    };

    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LETTER',
      header,
      content: [info, data, message],
      pageMargins: [20, 90, 20, 30],
    };
  }

  async generateFormatT(studentId: string, level: string): Promise<any> {
    const student = await this.studentsService.get(studentId).toPromise();
    const credits = await this.getCredits(
      student.documentId,
      level
    ).toPromise();
    const summary = await this.getSummary(
      student.documentId,
      level
    ).toPromise();

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
    summary.forEach((year) => {
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

  avg(values: number[]): string {
    if (values.length) {
      return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    }
  }
}
