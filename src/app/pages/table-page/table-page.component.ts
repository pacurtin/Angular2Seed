import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {
  IDateRange, ISale, ISalesDataInput, RestHttpService
} from '../../services/restHttp/rest-http.service';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup} from '@angular/forms';
import {CsvService} from '../../services/csv/csv.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements AfterViewInit {

  searching = false;         // show/hide loading spinner
  searchResultsFound = false;     // show results or message stating there are no results
  searchForm: FormGroup;
  dateRange: IDateRange;

  dataSource = new MatTableDataSource<ISale>();
  displayedColumns = [
    'actions', 'date', 'salesPerson', 'amount', 'location'
  ];
  selection = new SelectionModel<ISale>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  locations = [
    {value: undefined, viewValue: 'All Locations'},
    {value: 'LONDON', viewValue: 'London'},
    {value: 'DUBLIN', viewValue: 'Dublin'},
    {value: 'CORK', viewValue: 'Cork'}
  ];

  constructor(
    private restHttpService: RestHttpService,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef,
    public csvService: CsvService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createForm();
  }

  ngAfterViewInit() {
    this.search(); // we want a set of results to show when we open the page
    this.dataSource.sort = this.sort;
    this.sort.sort(<MatSortable>{
        id: 'date',
        start: 'desc'
      }
    );
  }

  createForm() {
    this.searchForm = new FormGroup({
      location: new FormControl()
    });
  }

  // this is listening for changes emitted by the date range component
  setDateRange(dateRange: IDateRange) {
    this.dateRange = dateRange;
  }

  search() {
    this.searching = true;

    // TODO improve backend to take parameters
    this.restHttpService.getSalesData(<ISalesDataInput>{
      // dateFrom: this.dateRange.dateFrom,
      // dateTo: this.dateRange.dateTo,
      // location: this.searchForm.get('location').value
    })
      .$observable
      .subscribe(
        response => {
          this.dataSource.data = response.results;
          this.searching = false;
          this.searchResultsFound = (response.results.length !== 0); // true if results > 0
        },
        error => {
          console.log('getSales returned error.');
          console.log(error);
          this.toastr.error('Error occurred getting list of sales.', 'Get sales failed');
          this.searching = false;
          this.searchResultsFound = false;
        }
      );
  }

  /* Below here is table functionality. Mostly tick box stuff */
  // Whether all rows are selected.
  isAllRowsSelected() {
    return this.dataSource.data.every(data => this.selection.isSelected(data));
  }

  isMasterToggleChecked() {
    return this.selection.hasValue() &&
      this.isAllRowsSelected() &&
      this.selection.selected.length >= this.dataSource.data.length;
  }

  isMasterToggleIndeterminate() {
    return this.selection.hasValue() &&
      (!this.isAllRowsSelected() || !this.dataSource.data.length);
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    if (this.isMasterToggleChecked()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(data => this.selection.select(data));
    }
  }

  /* Below here is functionality related to producing a CSV file from the table data */
  csvButtonClicked() {
    const formattedSales: ISaleForCsv[]  = this.reduceArray(this.dataSource.data);
    let csvData = this.csvService.generateCsv(formattedSales);
    csvData = this.changeCsvHeadings(csvData);
    this.csvService.downloadCsv(csvData, true);
  }

  reduceArray( sales: ISale[]):  ISaleForCsv[] {
    // map applies a callback function to every member of an array and produces a new Array. No mutation of original array.
    const preparedSalesObject: ISaleForCsv[] = sales.map((elem: ISale) => this.reduceSale(elem));
    return preparedSalesObject;
  }

  reduceSale( sale: ISale): ISaleForCsv {
    // if we don't want the following in our csv output we can remove it here
    const removeItems = ['amount'];
    const csvFormatSale = this.formatSale(sale, removeItems);
    return csvFormatSale;
  }

  // Functional style method for creating a copy of an object with selected keys removed.
  formatSale(obj: ISale, itemsToBeRemoved: Array<string>): any {
    return {
      ...Object.keys(obj)
        .filter(item => !this.isInArray(item, itemsToBeRemoved))
        .reduce((newObj, item) => {
          return {
            ...newObj, [item]: obj[item]
          };
        }, {})
    };
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  // Some of the heading need better names to more accurately reflect business logic.
  // Some just need to be converted from camelcase
  changeCsvHeadings(csv: string): string {
    csv = csv.replace('date', 'Date');
    csv = csv.replace('salesPerson', 'Sales Person');
    csv = csv.replace('amount', 'Amount');
    csv = csv.replace('location', 'Location');
    return csv;
  }

}

/* Sale with only the fields we want in our Csv */
export interface ISaleForCsv {
  date?: number;
  salesPerson?: string;
  location?: string;
}
