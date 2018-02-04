import {Injectable} from '@angular/core';
import {IApplicationState} from '../../store/application-state';
import {Store} from '@ngrx/store';
import {MeLoadedAction} from '../../store/actions';
import {RestHttpService} from '../restHttp/rest-http.service';

/* Service to trigger updating the store */

@Injectable()
export class StoreService {

  constructor(
    private restHttpService: RestHttpService,
    private store: Store<IApplicationState>
  ) { }

  // Making the call to the backend here
  // Once a response is received we trigger the MeLoadedAction with its payload
  loadMeData() {
    this.restHttpService.getMe()
      .$observable
      .subscribe(
        initialMeData => {
          this.store.dispatch(new MeLoadedAction(initialMeData));
        }, error => {
          console.log(error);
        }
      );
  }

}
