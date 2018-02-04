import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {IDateRange} from '../../services/restHttp/rest-http.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})

/* This is sub group in two form so I've made it it's own component */
/* @output emits an object with two dates as UTC(?) formatted strings */
/* Will emit when any of the three form fields are changed */
export class DateSelectorComponent implements OnInit {

  @Output() onDateRangeChanged = new EventEmitter<IDateRange>();
  datePickerGroup: FormGroup;

  @Input('parentForm')
  public parentForm: FormGroup;

  rangeChoices = [
    {value: 365, viewValue: ''},
    {value: 1, viewValue: 'Last Day'},
    {value: 7, viewValue: 'Last 7 Days'},
    {value: 30, viewValue: 'Last 30 Days'},
    {value: 365, viewValue: 'Last 365 Days'}
  ];

  // 1st create the form group
  constructor() {
    this.createFormGroup();
  }

  // 2nd attach it to parent form
  ngOnInit() {
    this.parentForm.addControl('dateSelector', this.datePickerGroup);
    this.emitDateRange(); // want to emit an initial daterange when component created.
  }

  // TODO Custom validator saying endDate must be after start date.
  createFormGroup() {
    this.datePickerGroup = new FormGroup({
      dateRange: new FormControl(''),
      startDate: new FormControl(moment().subtract(365, 'days')),
      endDate: new FormControl(moment())
    });
  }

  setDateRange(days) {
    this.datePickerGroup.get('dateRange').setValue('');
    this.datePickerGroup.get('startDate').setValue(moment().subtract(days, 'days'));
    this.datePickerGroup.get('endDate').setValue(moment());
    this.emitDateRange();
  }

  public emitDateRange() {
    this.onDateRangeChanged.emit(
      <IDateRange>{
        dateFrom: this.datePickerGroup.get('startDate').value.toDate().toISOString(),
        dateTo: this.datePickerGroup.get('endDate').value.hours(23).minutes(59).seconds(59).milliseconds(999).toDate().toISOString()
      }
    );
  }

}
