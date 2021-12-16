import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Period } from '../models/periods.model';
import { StudentSkill } from '../models/skills.model';
import { GradeSummary } from '../models/students.model';
import { FilesService } from './files.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class GradesReportsService {
  background: any;
  currentScore: number;
  constructor(
    private studentService: StudentsService,
    private filesService: FilesService,
    private session: SessionService,
    private http: HttpClient
  ) {
    this.http
      .get('/assets/img/report-background.jpg', { responseType: 'blob' })
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

  async generatePDF(studentId: string, period: Period) {
    // const image = await this.filesService.getBase64ImageFromURL(
    //   this.schoolsService.getLogo(this.session.currentSchool)
    // );
    const student = await firstValueFrom(this.studentService.get(studentId));
    const courses = await firstValueFrom(
      this.studentService.getSummary(studentId, period)
    );
    const skills = await firstValueFrom(
      this.studentService.getSkills(studentId)
    );
    this.currentScore = await firstValueFrom(
      this.studentService.getCurrentScore(studentId)
    );
    const header = {
      columns: [
        {
          text: '',
          margin: [20, 20],
          width: 175,
          fontSize: 7,
          alignment: 'right',
        },
        {
          stack: [
            'REPUBLICA DE PANAMÁ',
            'MINISTERIO DE EDUCACIÓN',
            this.session.currentSchool.name.toUpperCase(),
            '  ',
            'INFORME TRIMESTRAL',
            `AÑO LECTIVO ${environment.currentYear}`,
          ],
          alignment: 'center',
          bold: true,
          fontSize: 8.5,
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
      author: this.session.currentSchool.name,
    };
    const date = new Date();
    const studentInfo = [
      {
        columns: [
          {
            text: [
              { text: 'ESTUDIANTE: ' },
              { text: student.fullName.toUpperCase() },
            ],
            bold: true,
            fontSize: 8,
          },
          {
            text: [
              { text: 'CÉDULA: ', bold: true },
              { text: student.documentId },
            ],
            fontSize: 8,
          },
        ],
        margin: [0, 5, 0, 0],
      },
      {
        columns: [
          {
            text: [
              { text: 'SECCIÓN: ', bold: true },
              { text: student.section?.name.toUpperCase() },
            ],
            fontSize: 8,
          },
          {
            columns: [
              {
                text: [
                  { text: 'GRADO: ', bold: true },
                  { text: student.group.name },
                ],
                fontSize: 8,
              },
              {
                text: [
                  { text: 'FECHA: ', bold: true },
                  {
                    text: format(date, "d 'de' MMMM 'de' yyyy", { locale: es }),
                  },
                ],
              },
            ],

            fontSize: 8,
            width: '*',
          },
        ],
        margin: [0, 0, 0, 5],
      },
    ];

    const coursesTable = {
      fontSize: 7,
      table: {
        headerRows: 3,
        body: this.getValues(courses),
        widths: [180, 25, 25, 25, 28, 20, 20, 20, 20, 20, 20, 20, 20],
      },
    };

    const skillTable = {
      fontSize: 7,
      table: {
        headerRows: 1,
        body: this.getSkills(skills),
        widths: [180, 114.5, 114.5, 114.5],
      },
      margin: [0, 10, 0, 0],
    };

    const systemInfo = {
      text: 'SISTEMA DE CALIFICACIÓN: 5.0 NOTA MÁXIMA, 3.0 NOTA MÍNINA PARA APROBAR EL AÑO, 1.0 NOTA MÍNIMA.',
      bold: true,
      fontSize: 7,
      margin: [0, 5, 0, 0],
    };

    const skillsInfo = {
      text: 'HÁBITOS Y ACTITUDES SE CALIFICARÁN ASÍ: (S): SATISFACTORIO, (R): REGULAR, (X): DEFICIENTE.',
      bold: true,
      fontSize: 7.5,
      margin: [0, 0],
    };
    const notes = {
      text: 'OBSERVACIONES:',
      bold: true,
      fontSize: 8,
      margin: [0, 5, 0, 0],
    };

    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LETTER',
      info,
      header,
      background: [
        {
          image: await this.filesService.getBase64ImageFromURL(this.background),
          width: 611,
          absolutePosition: { x: 0, y: 0 },
        },
      ],
      content: [
        studentInfo,
        coursesTable,
        skillTable,
        systemInfo,
        skillsInfo,
        notes,
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 557,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
          margin: [0, 5],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 557,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
          margin: [0, 5],
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 5, x2: 200, y2: 5, lineWidth: 0.5 },
            { type: 'line', x1: 357, y1: 5, x2: 557, y2: 5, lineWidth: 0.5 },
          ],
          margin: [0, 20, 0, 2],
        },
        {
          columns: [
            {
              width: 200,
              fontSize: 9,
              text: 'Director',
              bold: true,
              alignment: 'center',
            },
            {
              width: 157,
              text: '',
              bold: true,
              alignment: 'center',
            },
            {
              width: 200,
              fontSize: 9,
              text: 'Consejería',
              bold: true,
              alignment: 'center',
            },
          ],
        },
      ],
      pageMargins: [20, 80, 20, 35],
    };
  }

  getValues(summary: GradeSummary) {
    const array: any[][] = [];
    array.push([
      { text: 'ASIGNATURAS', bold: true, rowSpan: 3 },
      { text: 'CALIFICACIONES', bold: true, alignment: 'center', colSpan: 4 },
      { text: '' },
      { text: '' },
      { text: '' },
      {
        text: 'AUSENCIAS Y TARDANZAS',
        bold: true,
        alignment: 'center',
        colSpan: 8,
      },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
    ]);
    array.push([
      { text: '' },
      { text: 'I    TRIM', bold: true, alignment: 'center', rowSpan: 2 },
      { text: 'II   TRIM', bold: true, alignment: 'center', rowSpan: 2 },
      { text: 'III  TRIM', bold: true, alignment: 'center', rowSpan: 2 },
      { text: 'PROM FINAL', bold: true, alignment: 'center', rowSpan: 2 },
      { text: 'I TRIM', bold: true, alignment: 'center', colSpan: 2 },
      { text: '' },
      { text: 'II TRIM', bold: true, alignment: 'center', colSpan: 2 },
      { text: '' },
      { text: 'III TRIM', bold: true, alignment: 'center', colSpan: 2 },
      { text: '' },
      { text: 'TOTAL', bold: true, alignment: 'center', colSpan: 2 },
      { text: '' },
    ]);
    array.push([
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'A', bold: true, alignment: 'center' },
      { text: 'T', bold: true, alignment: 'center' },
      { text: 'A', bold: true, alignment: 'center' },
      { text: 'T', bold: true, alignment: 'center' },
      { text: 'A', bold: true, alignment: 'center' },
      { text: 'T', bold: true, alignment: 'center' },
      { text: 'A', bold: true, alignment: 'center' },
      { text: 'T', bold: true, alignment: 'center' },
    ]);
    summary.courses.forEach((item) => {
      const element = [];
      element.push({
        text: this.truncate(item.course.name).toUpperCase(),
        noWrap: true,
      });
      element.push(
        {
          text: item.grades[0]?.score ? item.grades[0]?.score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: item.grades[1]?.score ? item.grades[1]?.score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: item.grades[2]?.score ? item.grades[2]?.score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: this.avg(
            item.grades.filter((x) => x.score > 0).map((x) => x.score)
          ),
          alignment: 'center',
          bold: true,
        },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' }
      );
      array.push(element);
      if (item.children) {
        item.children.forEach((child) => {
          const el = [];
          el.push({
            text: this.truncate(child.course.name).toUpperCase(),
            margin: [10, 0],
            noWrap: true,
          });
          el.push(
            {
              text: child.grades[0]?.score
                ? child.grades[0]?.score.toFixed(1)
                : '',
              alignment: 'center',
            },
            {
              text: child.grades[1]?.score
                ? child.grades[1]?.score.toFixed(1)
                : '',
              alignment: 'center',
            },
            {
              text: child.grades[2]?.score
                ? child.grades[2]?.score.toFixed(1)
                : '',
              alignment: 'center',
            },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' }
          );
          array.push(el);
        });
      }
    });
    const total = [];
    total.push({ text: 'PROMEDIO', bold: true });
    total.push({
      text: this.avg(
        summary.courses
          .filter((x) => x.grades[0]?.score > 0)
          .map((x) => x.grades[0]?.score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({
      text: this.avg(
        summary.courses
          .filter((x) => x.grades[1]?.score > 0)
          .map((x) => x.grades[1]?.score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({
      text: this.avg(
        summary.courses
          .filter((x) => x.grades[2]?.score > 0)
          .map((x) => x.grades[2]?.score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({
      text: this.currentScore.toFixed(2),
      alignment: 'center',
      bold: true,
    });
    total.push(
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    );
    array.push(total);

    return array;
  }

  avg(nums: number[]) {
    if (nums.length) {
      return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
    }
  }

  getSkills(skills: StudentSkill[]) {
    const array: any[][] = [];

    array.push([
      { text: 'HÁBITOS Y ACTITUDES', bold: true },
      { text: 'I TRIMESTRE', bold: true, alignment: 'center' },
      { text: 'II TRIMESTRE', bold: true, alignment: 'center' },
      { text: 'III TRIMESTRE', bold: true, alignment: 'center' },
    ]);
    skills.forEach((skill) => {
      const element = [];
      element.push({
        text: this.truncate(skill.skill.name).toUpperCase(),
      });
      skill.periods.forEach((period) => {
        element.push({ text: period.value, alignment: 'center' });
      });
      array.push(element);
    });

    return array;
  }

  truncate = (input: string) =>
    input.length > 40 ? `${input.substring(0, 40)}...` : input;
}
