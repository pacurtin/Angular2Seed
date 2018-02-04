// These Actions are for the components to change something in the state


import {IMe} from '../services/restHttp/rest-http.service';

export const ME_LOADED_ACTION = 'ME_LOADED_ACTION';

export class MeLoadedAction implements IPayloadAction {
  readonly type = ME_LOADED_ACTION;
  constructor(public payload: IMe = null) {}
}

export interface IPayloadAction {
  type: string;
  payload: any;
}











