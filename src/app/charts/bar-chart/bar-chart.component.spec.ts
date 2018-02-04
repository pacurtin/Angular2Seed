import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BarChartComponent} from './bar-chart.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {IDataSeriesEntry} from '../line-chart/line-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  const exampleData: IDataSeriesEntry[] = [
    {
      'name': 'A' ,
      'value': 3
    },
    {
      'name': 'B',
      'value': 5
    },
    {
      'name': 'C',
      'value': 12
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartComponent ],
      imports: [
        NgxChartsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // "Error: Timeout - Async callback was not invoked within timeout specified"
  // fixed by making Async
  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('should display a bar chart given data', () => {
    component.data = exampleData;
    fixture.detectChanges();
    expect(component.barChart).toBeTruthy();
  });

  it('should display nothing if no data provided', () => {
    expect(component.barChart).toBeFalsy();
  });
});
