import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageComponent } from './table-page.component';
import {ToggleSideNavService} from '../../services/side-nav/toggle-side-nav.service';
import {MockRestHttpService} from '../../services/restHttp/mock-rest-http.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ToastModule} from 'ng2-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CsvService} from '../../services/csv/csv.service';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastModule.forRoot(),
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSortModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [ TablePageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:    [
        {provide: RestHttpService, useClass: MockRestHttpService },
        ToggleSideNavService,
        CsvService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
