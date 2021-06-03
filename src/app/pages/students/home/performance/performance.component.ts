import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.sass'],
})
export class PerformanceComponent implements OnInit {
  score$: Observable<number>;
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontFamily: 'Poppins',
      },
    },
    title: {
      display: true,
      text: 'Rendimiento por asignatura',
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    tooltips: {
      bodyFontFamily: 'Poppins',
      titleFontFamily: 'Poppins',
      footerFontFamily: 'Poppins',
      callbacks: {
        label: (item, data) =>
          `${data.datasets[item.datasetIndex].label}: ${this.decimal.transform(
            item.yLabel,
            '1.1-1'
          )} `,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontFamily: 'Poppins',
            fontStyle: 'bold',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: false,
            suggestedMin: 1,
            suggestedMax: 5.5,
            display: false,
            fontFamily: 'Poppins',
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        display: false,
        font: { family: 'Poppins' },
        anchor: 'center',
        align: 'center',
      },
    },
  };
  public chartData: ChartDataSets[];

  public labels: Label[];
  public chartType: ChartType = 'bar';
  public legend = true;
  constructor(
    private session: SessionService,
    private studentService: StudentsService,
    private decimal: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.score$ = this.studentService.getCurrentScore(
      this.session.currentStudent.id
    );
    this.studentService
      .getPerformance(this.session.currentStudent.id)
      .subscribe(
        (res) => {
          this.labels = res[0].grades.map((x) => x.course.subject.shortName);
          this.chartData = res.map((x) => ({
            data: x.grades.map((y) => y.grade),
            label: x.period.name,
          }));
        },
        (err) => console.log(err)
      );
  }
}
