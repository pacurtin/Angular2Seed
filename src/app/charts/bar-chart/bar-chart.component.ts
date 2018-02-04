import {Component, Input, ViewChild} from '@angular/core';
import {IDataSeriesEntry} from '../line-chart/line-chart.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  @ViewChild('barChart') barChart: any;
  @ViewChild('button') button: any;

  @Input() data: IDataSeriesEntry[];
  @Input() xLabel: string;
  @Input() yLabel: string;

  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor() { }

}
