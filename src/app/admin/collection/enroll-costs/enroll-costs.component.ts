import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from 'custom-components';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-enroll-costs',
  templateUrl: './enroll-costs.component.html',
  styleUrls: ['./enroll-costs.component.sass']
})
export class EnrollCostsComponent implements OnInit {
  plans: Observable<StudyPlan[]>;
  table = new TableOptions();
  currentPlan: StudyPlan;
  sourceId: string;
  constructor(
    private plansServ: StudyPlanService,
    private translate: TranslateService,
    private session: SessionService,
    private filesServ: FilesService,
    private currency: CurrencyPipe,
    public modal: NgbModal
  ) {}

  ngOnInit() {
    this.table.searcheable = false;
    this.table.columns = [
      {
        name: 'description',
        title: this.translate.instant('Description'),
        required: true
      },
      {
        name: 'cost',
        title: this.translate.instant('Cost'),
        type: 'money',
        required: true
      }
    ];
    this.plans = this.plansServ.getAll();
  }

  async printPDF() {
    const doc = await this.generatePDF();
    pdfMake.createPdf(doc).print();
  }

  async generatePDF() {
    return {
      info: {
        title: `Costos de inscripción ${this.currentPlan.name} - ${environment.currentYear}`,
        author: this.session.currentSchool.name,
        subject: `Costos de inscripción ${this.currentPlan.name} - ${environment.currentYear}`,
        keywords: `Costos de inscripción ${this.session.currentSchool.name} ${this.currentPlan.name}`
      },
      header: {
        columns: [
          {
            columns: [
              {
                image: await this.filesServ.getBase64ImageFromURL(
                  'assets/img/logo-vertical.png'
                ),
                width: 80
              }
            ],
            width: 175,
            margin: [20, 10]
          },
          {
            stack: [
              this.session.currentSchool.name,
              this.translate.instant('Enroll costs'),
              `${this.currentPlan.name} - ${environment.currentYear}`
            ],
            alignment: 'center',
            bold: true,
            color: '#2D3748',
            fontSize: 15,
            margin: [0, 20]
          },
          {
            text: '',
            margin: [20, 20],
            width: 175,
            fontSize: 8,
            alignment: 'right'
          }
        ]
      },
      pageMargins: [20, 100, 20, 60],
      content: [
        {
          text: [
            {
              text: `${this.translate.instant('Total charges')}: `,
              fontSize: 14
            },
            {
              text: this.currency.transform(this.total(), 'PAB'),
              fontSize: 17,
              color: '#2D3748',
              bold: true
            }
          ]
        },
        {
          layout: 'headerLineOnly',
          margin: [60, 20],
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: this.getValues()
          }
        }
      ]
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
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        item.description,
        this.translate.instant('Created item', {
          value: this.translate.instant('Charge')
        }),
        'success'
      );
    });
  }

  open(content: any): void {
    this.modal.open(content).result.then(() => {
      Swal.fire({
        title: this.translate.instant('Wanna copy charges?'),
        text: this.translate.instant('Your current charges gonna be erased'),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.translate.instant('Cancel'),
        confirmButtonText: this.translate.instant('Yes, copy them!')
      }).then(res => {
        if (res.value) {
          const ids = [];
          ids.push(this.currentPlan.id);
          ids.push(this.sourceId);
          this.plansServ.copyCharges(ids).subscribe(
            () => {
              Swal.fire(
                this.translate.instant('Copied!'),
                this.translate.instant('Courses copied succesfully'),
                'success'
              );
              this.plans = this.plansServ.getAll();
            },
            (err: Error) => {
              Swal.fire(
                this.translate.instant('Something went wrong'),
                this.translate.instant(err.message),
                'error'
              );
            }
          );
        }
      });
    });
  }

  editCharge(item: { description: string; cost: number }) {
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        item.description,
        this.translate.instant('Updated item', {
          value: this.translate.instant('Charge')
        }),
        'success'
      );
    });
  }

  getValues() {
    const array: string[][] = [];
    array.push([
      this.translate.instant('Description'),
      this.translate.instant('Cost')
    ]);
    this.currentPlan.enrollCharges.forEach(cost => {
      const element = [];
      element.push(cost.description);
      element.push(this.currency.transform(cost.cost, 'PAB'));
      array.push(element);
    });
    return array;
  }

  deleteCharge(item: any) {
    console.log(this.currentPlan);
    console.log(item);
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        '',
        this.translate.instant('Deleted item', {
          value: this.translate.instant('Charge')
        }),
        'info'
      );
    });
  }
}
