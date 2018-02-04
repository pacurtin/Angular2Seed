import {IApplicationState} from '../../store/application-state';

// Selector function for creating a ViewModel from the Model in our flux store
export function logoSelector(state: IApplicationState): string {
    return state.storeData.me.logo;
}

