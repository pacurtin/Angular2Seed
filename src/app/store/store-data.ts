import {IMe} from '../services/restHttp/rest-http.service';

export interface IStoreData {
  // TODO may have to use {[key:number]: IMe} syntax
    me: IMe;
}

export const INITIAL_STORE_DATA: IStoreData = {
  me : {
    id: 0,
    userName: '',
    email: '',
    logo: 'http://i.imgur.com/YdhUZdZ.png',
    name: '',
    token: ''
  }
};
