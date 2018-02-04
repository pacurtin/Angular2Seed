import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  @ViewChild('lineChart') lineChart: any;
  @ViewChild('button') button: any;

  @Input() data: ILineGraphData[];
  @Input() xLabel: string;
  @Input() yLabel: string;

  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor() {}

}

// For multiple lines use multiple ILineGraphData objects
export interface ILineGraphData {
  name: string;
  series: IDataSeriesEntry[];
}

export interface IDataSeriesEntry {
  name: string;
  value: any;
}

