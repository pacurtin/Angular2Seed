import {Component, Input, ViewChild} from '@angular/core';
import {IDataSeriesEntry} from '../line-chart/line-chart.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {

  @ViewChild('pieChart') salesPieChart: any;
  @ViewChild('button') button: any;

  @Input() data: IDataSeriesEntry[];

  constructor() {}

}
