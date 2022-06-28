import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SurveyQuestion } from 'src/app/shared/models/surveys.model';

@Component({
  selector: 'skooltrak-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.sass'],
})
export class QuestionResultComponent implements OnInit {
  @Input() question: SurveyQuestion;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
      y: {},
    },
    plugins: {
      datalabels: { anchor: 'end', align: 'end' },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor() {}

  ngOnInit(): void {
    this.chartData.labels = this.question?.options.map((x) => x.answerText);
    this.chartData.datasets = [
      {
        data: this.question?.options.map((x) => x.count),
        label: 'Respuestas',
        hoverBackgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)',
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
      },
    ];
  }
}
