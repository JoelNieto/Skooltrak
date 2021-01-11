import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { StudentSkill } from '../models/skills.model';

import { GradeSummary } from '../models/students.model';
import { FilesService } from './files.service';
import { SchoolsService } from './schools.service';
import { SessionService } from './session.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class GradesReportsService {
  background: any;
  constructor(
    private schoolsService: SchoolsService,
    private studentService: StudentsService,
    private filesService: FilesService,
    private session: SessionService,
    private http: HttpClient
  ) {
    this.http
      .get('/assets/img/report-background.jpg', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          this.background = base64data;
        };

        reader.readAsDataURL(res);
      });
  }

  async generatePDF(studentId: string) {
    const image = await this.filesService.getBase64ImageFromURL(
      this.schoolsService.getLogo(this.session.currentSchool)
    );
    const student = await this.studentService.get(studentId).toPromise();
    const courses = await this.studentService.getSummary(studentId).toPromise();
    const skills = await this.studentService.getSkills(studentId).toPromise();
    const header = {
      columns: [
        {
          text: '',
          margin: [20, 20],
          width: 175,
          fontSize: 8,
          alignment: 'right',
        },
        {
          stack: [
            'REPUBLICA DE PANAMÁ',
            'MINISTERIO DE EDUCACIÓN',
            this.session.currentSchool.name.toUpperCase(),
            '  ',
            'INFORME TRIMESTRAL',
            'AÑO LECTIVO 2020',
          ],
          alignment: 'center',
          bold: true,
          fontSize: 9,
        },
        {
          text: '',
          margin: [20, 20],
          width: 175,
          fontSize: 8,
          alignment: 'right',
        },
      ],
      margin: [20, 15, 20, 10],
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
            fontSize: 9,
          },
          {
            text: [
              { text: 'CÉDULA: ', bold: true },
              { text: student.documentId },
            ],
            fontSize: 9,
          },
        ],
        margin: [0, 10, 0, 0],
      },
      {
        columns: [
          {
            columns: [
              {
                text: [
                  { text: 'SECCIÓN: ', bold: true },
                  { text: student.section.name.toUpperCase() },
                ],
                fontSize: 9,
              },
              {
                text: [
                  { text: 'GRADO: ', bold: true },
                  { text: student.group.name },
                ],
                fontSize: 9,
              },
            ],
            width: '50%',
          },
          {
            text: [
              { text: 'FECHA: ', bold: true },
              {
                text: format(date, 'd \'de\' MMMM \'de\' yyyy', { locale: es }),
              },
            ],
            fontSize: 9,
            width: '*',
          },
        ],
        margin: [0, 0, 0, 0],
      },
    ];

    const coursesTable = {
      fontSize: 8,
      table: {
        headerRows: 2,
        body: this.getValues(courses),
        widths: [230, 66, 66, 66, 66],
      },
    };

    const skillTable = {
      fontSize: 8,
      table: {
        headerRows: 1,
        body: this.getSkills(skills),
        widths: [230, 91, 91, 91],
      },
      margin: [0, 10],
    };

    const attendanceTable = {
      fontSize: 8,
      table: {
        body: this.getAttendance(),
        widths: [230, 91, 91, 91],
      },
    };

    const systemInfo = {
      text:
        'SISTEMA DE CALIFICACIÓN: 5.0 NOTA MÁXIMA, 3.0 NOTA MÍNINA PARA APROBAR EL AÑO, 1.0 NOTA MÍNIMA.',
      bold: true,
      fontSize: 9,
      margin: [0, 10, 0, 5],
    };

    const skillsInfo = {
      text:
        'HÁBITOS Y ACTITUDES SE CALIFICARÁN ASÍ: (S): SATISFACTORIO, (R): REGULAR, (X): DEFICIENTE.',
      bold: true,
      fontSize: 9,
      margin: [0, 5],
    };
    const notes = {
      text: 'OBSERVACIONES:',
      bold: true,
      fontSize: 9,
      margin: [0, 5],
    };

    return {
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
        attendanceTable,
        systemInfo,
        skillsInfo,
        notes,
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 537,
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
              x2: 537,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
          margin: [0, 5],
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 5, x2: 200, y2: 5, lineWidth: 0.5 },
            { type: 'line', x1: 337, y1: 5, x2: 537, y2: 5, lineWidth: 0.5 },
          ],
          margin: [0, 20, 0, 0],
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
              width: 137,
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
      pageMargins: [20, 90, 20, 60],
      defaultFontStyle: { font: 'Helvetica' },
    };
  }

  getValues(summary: GradeSummary) {
    const array: any[][] = [];
    array.push([
      { text: 'ASIGNATURAS', bold: true, rowSpan: 2 },
      { text: 'CALIFICACIONES', bold: true, alignment: 'center', colSpan: 4 },
      { text: '' },
      { text: '' },
      { text: '' },
    ]);
    array.push([
      { text: '' },
      { text: 'I TRIMESTRE', bold: true, alignment: 'center' },
      { text: 'II TRIMESTRE', bold: true, alignment: 'center' },
      { text: 'III TRIMESTRE', bold: true, alignment: 'center' },
      { text: 'PROM. FINAL', bold: true, alignment: 'center' },
    ]);
    summary.courses.forEach((item) => {
      const element = [];
      element.push({
        text: this.truncate(item.course.name).toUpperCase(),
        noWrap: true,
      });
      element.push(
        {
          text: item.grades[0].score ? item.grades[0].score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: item.grades[1].score ? item.grades[1].score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: item.grades[2].score ? item.grades[2].score.toFixed(1) : '',
          alignment: 'center',
        },
        {
          text: this.avg(
            item.grades.filter((x) => x.score > 0).map((x) => x.score)
          ),
          alignment: 'center',
          bold: true,
        }
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
              text: child.grades[0].score
                ? child.grades[0].score.toFixed(1)
                : '',
              alignment: 'center',
            },
            {
              text: child.grades[1].score
                ? child.grades[1].score.toFixed(1)
                : '',
              alignment: 'center',
            },
            {
              text: child.grades[2].score
                ? child.grades[2].score.toFixed(1)
                : '',
              alignment: 'center',
            },
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
          .filter((x) => x.grades[0].score > 0)
          .map((x) => x.grades[0].score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({
      text: this.avg(
        summary.courses
          .filter((x) => x.grades[1].score > 0)
          .map((x) => x.grades[1].score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({
      text: this.avg(
        summary.courses
          .filter((x) => x.grades[2].score > 0)
          .map((x) => x.grades[2].score)
      ),
      alignment: 'center',
      bold: true,
    });
    total.push({ text: '' });
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

  getAttendance() {
    const array: any[][] = [];
    array.push([
      'AUSENCIAS',
      { text: '0', alignment: 'center' },
      { text: '0', alignment: 'center' },
      { text: '0', alignment: 'center' },
    ]);
    array.push([
      'TARDANZAS',
      { text: '0', alignment: 'center' },
      { text: '0', alignment: 'center' },
      { text: '0', alignment: 'center' },
    ]);
    return array;
  }

  truncate = (input: string) =>
    input.length > 40 ? `${input.substring(0, 40)}...` : input;
}
