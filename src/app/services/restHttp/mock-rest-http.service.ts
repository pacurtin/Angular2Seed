import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ILoginResponse, IMe, IReport, ISalesData} from './rest-http.service';


/* Service for mocking REST information in tests */

@Injectable()
export class MockRestHttpService {

  exampleMe: IMe = {
    id: 12345,
    userName: 'paddy',
    email: 'lad@lad.com',
    logo: 'https://data.whicdn.com/images/66288208/large.jpg',
    name: 'lad',
    token: 'cnqei3848h3f90vcoqevbhbnqevhjnbevh'
  };

  exampleSalesData: ISalesData = {
    results: [
      {
        date: '01/02/12',
        salesPerson: 'Larry',
        amount: 100,
        location: 'Dublin'
      },
      {
        date: '01/04/12',
        salesPerson: 'Larry',
        amount: 1000,
        location: 'Dublin'
      }
    ]
  };

  exampleLogin: ILoginResponse = {
    token: 'wepjnvpiuh2hfp3heivj'
  };

  exampleChartData: IReport = {
    'results': [
      {'name': '2017-02-05', 'value': 5},
      {'name': '2017-02-06', 'value': 4},
      {'name': '2017-02-07', 'value': 4}
    ]
  };

  // need this to satisfy the shape of the object the components expect from the service
  public static ngResourceGetMock(example: any): any {
    return {
      $observable: Observable.create(observer => {
        observer.next(example);
      })
    };
  }

  getMe(): any {
    return MockRestHttpService.ngResourceGetMock(this.exampleMe);
  }

  getLogin(): any {
    return MockRestHttpService.ngResourceGetMock(this.exampleLogin);
  }

  getLineData() {
    return MockRestHttpService.ngResourceGetMock(this.exampleChartData);
  }

  getBarData() {
    return MockRestHttpService.ngResourceGetMock(this.exampleChartData);
  }

  getPieData() {
    return MockRestHttpService.ngResourceGetMock(this.exampleChartData);
  }

  getSalesData() {
    return MockRestHttpService.ngResourceGetMock(this.exampleSalesData);
  }

}
