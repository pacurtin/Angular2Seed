import { TestBed, inject } from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RestHttpService} from './rest-http.service';

describe('RestHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RestHttpService]
    });
  });

  it('should be created (this does not require any additional tests, ngx-rest lib has its own coverage)'
    , inject([RestHttpService], (service: RestHttpService) => {
    expect(service).toBeTruthy();
  }));
});
