import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from 'src/app/shared/models/surveys.model';
import { ChartType, ChartData, ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.sass'],
})
export class QuestionResultComponent implements OnInit {
  @Input() question: SurveyQuestion;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];
  public barChartPlugins = [pluginDataLabels];
  constructor() {}

  ngOnInit(): void {
    this.barChartLabels = this.question?.options.map((x) => x.answerText);
    this.barChartData = [
      {
        data: this.question?.options.map((x) => x.count),
        label: 'Respuestas',
      },
    ];
  }
}