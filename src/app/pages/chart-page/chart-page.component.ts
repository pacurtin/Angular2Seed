import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IDataSeriesEntry, ILineGraphData} from '../../charts/line-chart/line-chart.component';
import {ToggleSideNavService} from '../../services/side-nav/toggle-side-nav.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit, AfterViewInit {

  // Sales Line Graph
  salesLineChartDataDay: ILineGraphData[];
  salesLineChartXLabelDay = 'Date';
  salesLineChartYLabelDay = 'Sales';

  // Sales Pie Graph
  salesPersonData: IDataSeriesEntry[];

  // Sales Bar Graph
  salesBarChartData: IDataSeriesEntry[];
  salesBarChartXLabel = 'Location';
  salesBarChartYLabel = 'Sales';

  chartsLoaded: boolean;

  constructor(
    private restHttpService: RestHttpService,
    private toggleSideNavService: ToggleSideNavService,
  ) {}

  ngOnInit() {
    this.toggleSideNavService.toggleSideNav();
  }

  ngAfterViewInit() {
    this.getData();
  }

  /*
    Below here is graph specific
   */
  getData() {
    this.chartsLoaded = false;
    // TODO create own Node server and change these names
    this.getGraphData(this.restHttpService.getLineData(), 'salesLineChartDataDay', 'Total Sales');
    this.getGraphData(this.restHttpService.getPieData(), 'salesPersonData', null);
    this.getGraphData(this.restHttpService.getBarData(), 'salesBarChartData', null);
  }

  // Passing function as parameters to avoid code duplication
  getGraphData(apiRequestFunction, graphDataStoreVariable, seriesName) {
    apiRequestFunction
      .$observable
      .finally(() => this.chartsLoaded = true)
      .subscribe(
        response => {
          if ( seriesName ) {
            this[graphDataStoreVariable] = this.setLineGraphData(seriesName, response.results);
          } else {
            this[graphDataStoreVariable] = response.results;
          }
        },
        error => {
          console.log('getGraphData returned error.');
          console.log(error);
        }
      );
  }

  // line graphs need to have a name added to the json
  setLineGraphData(seriesName, data) {
    return [
      {
        name: seriesName, series: data
      }
    ];
  }

}
