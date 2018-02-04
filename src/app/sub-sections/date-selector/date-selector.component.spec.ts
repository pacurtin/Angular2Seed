import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectorComponent } from './date-selector.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DateSelectorComponent', () => {
  let component: DateSelectorComponent;
  let fixture: ComponentFixture<TestDateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDateSelectorComponent,
        DateSelectorComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDateSelectorComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-date-selector',
  template:
  '<app-date-selector ' +
    '#dateSelector ' +
    '[parentForm]="mockParentForm" ' +
    '(onDateRangeChanged)="setDateRange($event)">' +
  '</app-date-selector>'
})
class TestDateSelectorComponent {
  mockParentForm = new FormGroup({});
  setDateRange(event) {}
}
