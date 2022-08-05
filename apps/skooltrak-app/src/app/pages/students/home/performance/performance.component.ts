import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.sass'],
})
export class PerformanceComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  score$: Observable<number>;
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: { family: 'Inter', style: 'oblique' },
        },
      },
      y: {
        beginAtZero: false,
        suggestedMin: 1,
        suggestedMax: 5.5,
        ticks: {
          stepSize: 1,

          display: false,
          font: { family: 'Inter' },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: { family: 'Inter' },
        },
      },
      tooltip: {
        bodyFont: { family: 'Inter' },
        titleFont: { family: 'Inter' },
        footerFont: { family: 'Inter' },
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${this.decimal.transform(
              tooltipItem.formattedValue,
              '1.1-1'
            )}`;
          },
        },
      },
      title: {
        display: true,
        text: 'Rendimiento por asignatura',
        font: { size: 16, family: 'Inter' },
      },
      datalabels: {
        display: false,
        font: { family: 'Inter' },
        anchor: 'center',
        align: 'center',
      },
    },
  };

  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
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
      .subscribe({
        next: (res) => {
          this.chartData.labels = res[0].grades.map(
            (x) => x.course.subject.shortName
          );
          this.chartData.datasets = res.map((x) => ({
            data: x.grades.map((y) => y.grade),
            label: x.period.name,
          }));
        },
        error: (err) => console.error(err),
      });
  }
}
