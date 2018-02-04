import {Injectable} from '@angular/core';
import {ResourceAction, ResourceMethod, ResourceParams} from 'ngx-resource';
import {RestClient} from '../../../rest-client';
import {RequestMethod} from '@angular/http';
import {IDataSeriesEntry} from '../../charts/line-chart/line-chart.component';

/* Service for accessing information from the backend */

/*
    Rest action definitions
    Using ngx-resource
*/
@Injectable()
@ResourceParams({
  path: '/api/'
})
export class RestHttpService extends RestClient {

  // FYI Logo image uses file uploader instead of ngx-resource. Check the profile component to see for yourself

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/line'
  })
  getLineData: ResourceMethod<null, IReport>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/bar'
  })
  getBarData: ResourceMethod<null, IReport>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/pie'
  })
  getPieData: ResourceMethod<null, IReport>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/sales'
  })
  getSalesData: ResourceMethod<ISalesDataInput, ISalesData>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/login'
  })
  getLogin: ResourceMethod<ILoginInput, ILoginResponse>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/api/me',
    auth: true
  })
  getMe: ResourceMethod<null, IMe>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/api/me',
    contentTypeJson: true,
    auth: true
  })
  saveMe: ResourceMethod<IMe, any>;

}

/*
    Interfaces defining types for sending and receiving information from backend
    Any type I'm not sure about I just put as "any".
    ? signify optional fields
*/

export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IMe {
  id?: number;
  userName?: string;
  email?: string;
  logo?: string;
  name?: string;
  token?: any;
}

export interface IDateRange {
  // Back end expects a Date.toIsoString string for dates
  dateTo: string;
  dateFrom: string;
}

export interface IReport {
  results: IDataSeriesEntry[];
}

export  interface ISale {
  date: string;
  salesPerson: string;
  amount: number;
  location: string;
}
export interface ISalesData {
  results: ISale[];
}

export interface ISalesDataInput {
  // Back ends seem to be expect a Date.toIsoString string for dates
  // /api/sales?dateFrom=2017-10-31T14:00:00.000Z&dateTo=2017-12-01T13:59:59.999Z

  dateTo?: string;
  dateFrom?: string;
  location?: string;
}

