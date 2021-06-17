import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { environment } from 'src/environments/environment';

import { ClassGroup } from '../models/studyplans.model';
import { FilesService } from './files.service';
import { PreScholarService } from './prescholar.service';
import { SchoolsService } from './schools.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class PreScholarReportsService {
  constructor(
    private studentsService: StudentsService,
    private preScholarService: PreScholarService,
    private filesService: FilesService,
    private schoolsService: SchoolsService,
    private session: SessionService
  ) {}

  async generatePDF(studentId: string, group: ClassGroup) {
    const student = await this.studentsService.get(studentId).toPromise();
    const values = await this.preScholarService
      .getValues(studentId)
      .toPromise();
    const crest = await this.filesService.getBase64ImageFromURL(
      this.schoolsService.getLogo(this.session.currentSchool)
    );

    const cover = {
      columns: [
        {
          stack: [
            {
              text: 'ASISTENCIA',
              fontSize: 8,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            {
              fontSize: 8,
              table: {
                widths: [65, 65, 65, 65],
                body: [
                  [
                    '',
                    { text: 'TRIMESTRE I', bold: true, alignment: 'center' },
                    { text: 'TRIMESTRE II', bold: true, alignment: 'center' },
                    { text: 'TRIMESTRE II', bold: true, alignment: 'center' },
                  ],
                  ['Ausencias', '', '', ''],
                  ['Tardanzas', '', '', ''],
                ],
              },
            },
          ],
          margin: [10, 0],
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
                  text: format(new Date(student.birthDate), 'd/MM/yyyy', {
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
              text: ['MAESTRA: ', { text: group.counselor.name, bold: true }],
              alignment: 'left',
              margin: [0, 2.5],
            },
          ],
          alignment: 'center',
          margin: 20,
          fontSize: 13,
        },
      ],
      pageBreak: 'after',
    };
    const tables = [];
    const headerRow = {
      fontSize: 6.5,
      margin: [10, 0],
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
        widths: [200, 20, 20, 20],
      },
    };
    const continuationRow = {
      fontSize: 6.5,
      margin: [10, 0],
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
        widths: [200, 20, 20, 20],
      },
    };

    values.forEach((area) => {
      const table = {
        fontSize: 6.5,
        margin: [10, 0],
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
          widths: [200, 20, 20, 20],
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
              margin: 5,
            },
          ],
        },
        { stack: [] },
      ],
    };
    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LEGAL',
      pageMargins: [10, 20, 10, 15],
      pageOrientation: 'landscape',
      content: [cover, content],
    };
  }
}
