import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CreditSummary, GroupedCredit } from '../models/credits.model';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class CreditsService {
  private url: string;
  constructor(
    private http: HttpClient,
    private studentsService: StudentsService
  ) {
    this.url = environment.urlAPI + 'credits';
  }

  public getCredits(documentId: string) {
    const params = new HttpParams().set('documentId', documentId);
    return this.http.get<GroupedCredit[]>(this.url, { params });
  }

  public getSummary(documentId: string) {
    const params = new HttpParams().set('documentId', documentId);
    return this.http.get<CreditSummary[]>(`${this.url}/Summary`, { params });
  }

  async generatePDF(studentId: string) {
    const student = await this.studentsService.get(studentId).toPromise();
    const credits = await this.getCredits(student.documentId).toPromise();
    const summary = await this.getSummary(student.documentId).toPromise();

    const cover = {
      columns: [
        {
          stack: [
            {
              fontSize: 8,
              table: {
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
            { text: 'MINISTERIO DE EDUCACIÓN', bold: true, margin: 10 },
            { text: 'EDUCACIÓN BÁSICA GENERAL', bold: true, margin: 10 },
            'REGISTRO ACUMULATIVO',
            { text: student.fullName, fontSize: 20 },
          ],
        },
      ],
    };
    return {
      defaultStyle: { font: 'Roboto' },
      pageSize: 'LETTER',
      pageMargins: [20, 20, 20, 15],
      pageOrientation: 'landscape',
      content: [cover],
    };
  }
}
