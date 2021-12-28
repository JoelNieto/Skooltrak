import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ClassGroup } from '../models/studyplans.model';
import { FilesService } from './files.service';
import { PreScholarService } from './prescholar.service';
import { SchoolsService } from './schools.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class PreScholarReportsService {
  background: any;
  constructor(
    private studentsService: StudentsService,
    private preScholarService: PreScholarService,
    private filesService: FilesService,
    private schoolsService: SchoolsService,
    private session: SessionService,
    private http: HttpClient
  ) {
    this.http
      .get('/assets/img/pre-report-background.jpg', { responseType: 'blob' })
      .subscribe({
        next: (res) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            this.background = base64data;
          };

          reader.readAsDataURL(res);
        },
        error: (err) => console.error(err),
      });
  }
  async generatePDF(studentId: string, group: ClassGroup) {
    const student = await firstValueFrom(this.studentsService.get(studentId));
    const values = await firstValueFrom(
      this.preScholarService.getValues(studentId)
    );

    const crest = await this.filesService.getBase64ImageFromURL(
      this.schoolsService.getLogo(this.session.currentSchool)
    );

    const cover = {
      columns: [
        {
          stack: [
            {
              text: 'ASISTENCIA',
              fontSize: 9,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            {
              fontSize: 8,
              table: {
                widths: [65, 62, 62, 62],
                body: [
                  [
                    '',
                    { text: 'TRIMESTRE 1', bold: true, alignment: 'center' },
                    { text: 'TRIMESTRE 2', bold: true, alignment: 'center' },
                    { text: 'TRIMESTRE 3', bold: true, alignment: 'center' },
                  ],
                  ['Ausencias', '', '', ''],
                  ['Tardanzas', '', '', ''],
                ],
              },
            },
            {
              canvas: [
                {
                  type: 'line',
                  x1: 50,
                  y1: 100,
                  x2: 250,
                  y2: 100,
                  lineWidth: 0.8,
                },
              ],
              margin: [0, 5],
            },
            {
              text: 'Firma del acudiente',
              alignment: 'center',
              margin: [0, 2],
              fontSize: 8,
            },
            {
              text: format(new Date(), 'dd / MMM / yyyy', { locale: es }),
              alignment: 'center',
              fontSize: 8,
            },
          ],
          margin: [20, 0],
        },
        {},
        {
          stack: [
            'REPUBLICA DE PANAMÁ',
            'MINISTERIO DE EDUCACIÓN',
            'DIRECCIÓN NACIONAL DE EDUCACIÓN PARTICULAR',
            this.session.currentSchool.name.toUpperCase(),
            { image: crest, width: 140, margin: [0, 30] },
            'INFORME PARA LA FAMILIA',
            `AÑO LECTIVO ${environment.currentYear}`,
            {
              text: student.fullName.toUpperCase(),
              margin: [0, 40],
              bold: true,
            },
            {
              text: [
                'FECHA DE NACIMIENTO: ',
                {
                  text: format(new Date(student.birthDate), 'dd / MMM / yyyy', {
                    locale: es,
                  }),
                  bold: true,
                },
              ],
              alignment: 'left',
              margin: [0, 2.5],
            },
            {
              text: ['CÉDULA: ', { text: student.documentId, bold: true }],
              alignment: 'left',
              margin: [0, 2.5],
            },
            {
              text: ['GRUPO: ', { text: student.group.name, bold: true }],
              alignment: 'left',
              margin: [0, 2.5],
            },
            {
              text: ['MAESTRA: ', { text: group?.counselor?.name, bold: true }],
              alignment: 'left',
              margin: [0, 2.5],
            },
            {
              text: ['DIRECTORA: ', { text: 'Kenelma Quintero', bold: true }],
              alignment: 'left',
              margin: [0, 2.5],
            },
          ],
          alignment: 'center',
          margin: 30,
          fontSize: 12,
        },
      ],
      pageBreak: 'after',
    };
    const tables = [];
    const headerRow = {
      fontSize: 6.5,
      margin: [20, 0],
      bold: true,
      alignment: 'center',
      table: {
        body: [
          [
            {
              text: 'ASPECTOS OBSERVADOS POR ÁREAS',
              rowSpan: 2,
            },
            { text: 'TRIMESTRES', colSpan: 3 },
            '',
            '',
          ],
          ['', '1', '2', '3'],
        ],
        widths: [190, 20, 20, 20],
      },
    };
    const continuationRow = {
      fontSize: 6.5,
      margin: [20, 0],
      bold: true,
      alignment: 'center',
      table: {
        body: [
          [
            {
              text: '...CONTINUACIÓN',
              rowSpan: 2,
            },
            { text: 'TRIMESTRES', colSpan: 3 },
            '',
            '',
          ],
          ['', '1', '2', '3'],
        ],
        widths: [190, 20, 20, 20],
      },
    };

    values.forEach((area) => {
      const table = {
        fontSize: 6.5,
        margin: [20, 0],
        table: {
          headerRows: 1,
          body: [
            [
              {
                text: area.area.name,
                colSpan: 4,
                bold: true,
                alignment: 'center',
                fillColor: area.area.color,
                color: '#ffffff',
              },
              '',
              '',
              '',
            ],
          ],
          widths: [190, 20, 20, 20],
        },
      };
      area.evaluations.forEach((evaluation) => {
        const tableRow: any[] = [{ text: evaluation.item.name }];
        evaluation.periods.forEach((period) => {
          tableRow.push({ text: period.value, alignment: 'center' });
        });
        table.table.body.push(tableRow);
      });
      tables.push(table);
    });

    const content = {
      columns: [
        {
          stack: [
            headerRow,
            tables[0],
            tables[1],
            tables[2],
            tables[3],
            tables[4],
            tables[5],
          ],
        },
        {
          stack: [
            continuationRow,
            tables[6],
            tables[7],
            tables[8],
            tables[9],
            {
              text: [
                'CRITERIOS DE EVALUACIÓN: ',
                '(LHL): LO HE LOGRADO, ',
                '(LEL): LO ESTOY LOGRANDO, ',
                '(LVL): LO VOY A LOGRAR',
              ],
              bold: true,
              fontSize: 8,
              margin: [10, 5],
            },
          ],
        },
        {
          stack: [
            {
              fontSize: 8,
              table: {
                heights: [10, 10, 70, 10, 10, 70, 10, 10, 70],
                widths: [130, 130],
                body: [
                  [
                    {
                      text: 'PRIMER TRIMESTRE',
                      colSpan: 2,
                      alignment: 'center',
                    },
                    '',
                  ],
                  [
                    { text: 'FORTALEZAS', alignment: 'center' },
                    { text: 'ASÍ ME PUEDEN AYUDAR', alignment: 'center' },
                  ],
                  ['', ''],
                  [
                    {
                      text: 'SEGUNDO TRIMESTRE',
                      colSpan: 2,
                      alignment: 'center',
                    },
                    '',
                  ],
                  [
                    { text: 'FORTALEZAS', alignment: 'center' },
                    { text: 'ASÍ ME PUEDEN AYUDAR', alignment: 'center' },
                  ],
                  ['', ''],
                  [
                    {
                      text: 'TERCER TRIMESTRE',
                      colSpan: 2,
                      alignment: 'center',
                    },
                    '',
                  ],
                  [
                    { text: 'FORTALEZAS', alignment: 'center' },
                    { text: 'ASÍ ME PUEDEN AYUDAR', alignment: 'center' },
                  ],
                  ['', ''],
                ],
              },
            },
            {
              canvas: [
                {
                  type: 'line',
                  x1: 50,
                  y1: 100,
                  x2: 250,
                  y2: 100,
                  lineWidth: 0.8,
                },
              ],
              margin: [0, 5],
            },
            {
              text: 'Maestra',
              alignment: 'center',
              margin: [0, 2],
              fontSize: 8,
            },
            {
              text: group.counselor.name,
              alignment: 'center',
              fontSize: 8,
              margin: [0, 0, 0, 20],
            },
            {
              canvas: [
                {
                  type: 'line',
                  x1: 50,
                  y1: 30,
                  x2: 250,
                  y2: 30,
                  lineWidth: 0.8,
                },
              ],
              margin: [0, 5],
            },
            {
              text: 'Directora',
              alignment: 'center',
              margin: [0, 2],
              fontSize: 8,
            },
            {
              text: 'Kenelma Quintero',
              alignment: 'center',
              fontSize: 8,
            },
          ],
          margin: [20, 0],
        },
      ],
    };
    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LEGAL',
      pageMargins: [10, 20, 10, 15],
      pageOrientation: 'landscape',
      content: [cover, content],
      background: [
        {
          image: this.background,
          width: 1011,
          absolutePosition: { x: 0, y: 0 },
        },
      ],
    };
  }
}
