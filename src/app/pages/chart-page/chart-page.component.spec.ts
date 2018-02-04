import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartPageComponent } from './chart-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToggleSideNavService} from '../../services/side-nav/toggle-side-nav.service';
import {MockRestHttpService} from '../../services/restHttp/mock-rest-http.service';
import {RestHttpService} from '../../services/restHttp/rest-http.service';

describe('ChartPageComponent', () => {
  let component: ChartPageComponent;
  let fixture: ComponentFixture<ChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:    [
        {provide: RestHttpService, useClass: MockRestHttpService },
        ToggleSideNavService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
