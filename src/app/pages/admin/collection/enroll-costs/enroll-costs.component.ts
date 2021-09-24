import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-enroll-costs',
  templateUrl: './enroll-costs.component.html',
  styleUrls: ['./enroll-costs.component.sass'],
})
export class EnrollCostsComponent implements OnInit {
  plans$: Observable<StudyPlan[]>;
  table = new TableOptions();
  currentPlan: StudyPlan;
  sourceId: string;
  constructor(
    private plansServ: StudyPlanService,
    private translate: TranslocoService,
    private session: SessionService,
    private filesServ: FilesService,
    private currency: CurrencyPipe,
    private schoolService: SchoolsService,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.table.searchable = false;
    this.table.hasId = false;
    this.table.columns = [
      {
        name: 'description',
        title: this.translate.translate('Description'),
        required: true,
      },
      {
        name: 'cost',
        title: this.translate.translate('Cost'),
        type: 'money',
        required: true,
      },
    ];
    this.plans$ = this.plansServ.getAll();
  }

  async printPDF() {
    const doc: any = await this.generatePDF();
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
          TimesNewRoman: {
            normal: 'Times-New-Roman-Regular.ttf',
            bold: 'Times-New-Roman-Bold.ttf',
            italics: 'Times-New-Roman-Italics.ttf',
            bolditalics: 'Times-New-Roman-Italics.ttf',
          },
        },
        pdfFonts.pdfMake.vfs
      )
      .download();
  }

  async generatePDF() {
    return {
      info: {
        title: `Costos de inscripción ${this.currentPlan.name} - ${environment.currentYear}`,
        author: this.session.currentSchool.name,
        subject: `Costos de inscripción ${this.currentPlan.name} - ${environment.currentYear}`,
        keywords: `Costos de inscripción ${this.session.currentSchool.name} ${this.currentPlan.name}`,
      },
      header: {
        columns: [
          {
            columns: [
              {
                image: await this.filesServ.getBase64ImageFromURL(
                  this.schoolService.getLogo(this.session.currentSchool)
                ),
                width: 80,
              },
            ],
            width: 175,
            margin: [20, 10],
          },
          {
            stack: [
              this.session.currentSchool.name,
              this.translate.translate('Enroll costs'),
              `${this.currentPlan.name} - ${environment.currentYear}`,
            ],
            alignment: 'center',
            bold: true,
            color: '#2D3748',
            fontSize: 15,
            margin: [0, 20],
          },
          {
            text: '',
            margin: [20, 20],
            width: 175,
            fontSize: 8,
            alignment: 'right',
          },
        ],
      },
      pageMargins: [20, 100, 20, 60],
      content: [
        {
          text: [
            {
              text: `${this.translate.translate('Total charges')}: `,
              fontSize: 14,
            },
            {
              text: this.currency.transform(this.total(), 'PAB'),
              fontSize: 17,
              color: '#2D3748',
              bold: true,
            },
          ],
        },
        {
          margin: [60, 20],
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: this.getValues(),
          },
        },
      ],
    };
  }

  total() {
    return this.currentPlan.enrollCharges.reduce(
      (sum, charge) => sum + charge.cost,
      0
    );
  }

  addCharge(item: { description: string; cost: number }) {
    this.currentPlan.enrollCharges.push(item);
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(
      () => {
        Swal.fire(
          item.description,
          this.translate.translate('Created item', {
            value: this.translate.translate('Charge'),
          }),
          'success'
        );
        this.plans$ = this.plansServ.getAll();
      },
      (err) => console.error(err)
    );
  }

  open(content: any): void {
    this.modal.open(content).result.then(() => {
      Swal.fire({
        title: this.translate.translate('Wanna copy charges?'),
        text: this.translate.translate('Your current charges gonna be erased'),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.translate.translate('Cancel'),
        confirmButtonText: this.translate.translate('Yes, copy them!'),
      }).then((res) => {
        if (res.value) {
          const ids = [];
          ids.push(this.currentPlan.id);
          ids.push(this.sourceId);
          this.plansServ.copyCharges(ids).subscribe(
            () => {
              Swal.fire(
                this.translate.translate('Copied!'),
                this.translate.translate('Courses copied succesfully'),
                'success'
              );
              this.plans$ = this.plansServ.getAll();
            },
            (err: Error) => {
              Swal.fire(
                this.translate.translate('Something went wrong'),
                this.translate.translate(err.message),
                'error'
              );
            }
          );
        }
      });
    });
  }

  editCharge(item: { description: string; cost: number }) {
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(
      () => {
        Swal.fire(
          item.description,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Charge'),
          }),
          'success'
        );
        this.plans$ = this.plansServ.getAll();
      },
      (err) => console.error(err)
    );
  }

  getValues() {
    const array: string[][] = [];
    array.push([
      this.translate.translate('Description'),
      this.translate.translate('Cost'),
    ]);
    this.currentPlan.enrollCharges.forEach((cost) => {
      const element = [];
      element.push(cost.description);
      element.push(this.currency.transform(cost.cost, 'PAB'));
      array.push(element);
    });
    return array;
  }

  deleteCharge(item: any) {
    this.currentPlan.enrollCharges.splice(item.currentIndex, 1);
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(
      () => {
        Swal.fire(
          '',
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Charge'),
          }),
          'info'
        );
        this.plans$ = this.plansServ.getAll();
      },
      (err) => console.error(err)
    );
  }
}
