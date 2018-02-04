import {Resource} from 'ngx-resource';
import {AuthService} from './app/services/auth/auth.service';

export class RestClient extends Resource {

  $getHeaders(methodOptions?: any): any {
    const headers: any = {};
    if (methodOptions.auth) {
      headers.Authorization = 'Bearer ' + AuthService.getToken();
      // TODO try to use AuthService for this. It's tricky to pass it into the constructor though...
    }
    if (methodOptions.contentTypeJson) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }
}
