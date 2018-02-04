import {IStoreData, INITIAL_STORE_DATA} from './store-data';

export interface IApplicationState {
  storeData: IStoreData;
}


export const INITIAL_APPLICATION_STATE: IApplicationState = {
  storeData: INITIAL_STORE_DATA
};
