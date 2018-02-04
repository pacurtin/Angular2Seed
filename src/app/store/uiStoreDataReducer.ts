import {IStoreData} from './store-data';
import {IPayloadAction, ME_LOADED_ACTION} from './actions';

export function storeData(state: IStoreData, action: IPayloadAction): IStoreData {

  switch (action.type)  {

      case ME_LOADED_ACTION:
        return {
          me: action.payload
        };

    default:
      return state;
  }
}
