import { TestBed, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
import {StoreModule} from '@ngrx/store';
import {INITIAL_APPLICATION_STATE} from '../../store/application-state';
import {reducers} from '../../app.module';
import {RestHttpService} from '../restHttp/rest-http.service';
import {MockRestHttpService} from '../restHttp/mock-rest-http.service';

describe('StoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // fixes Error: StaticInjectorError[Store]: StaticInjectorError[Store]: NullInjectorError: No provider for Store!
        StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE})
      ],
      providers: [
        StoreService,
        {provide: RestHttpService, useClass: MockRestHttpService }
      ]
    });
  });

  it('should be created', inject([StoreService], (service: StoreService) => {
    expect(service).toBeTruthy();
  }));
});

