import { TestBed, inject } from '@angular/core/testing';

import { ToggleSideNavService } from './toggle-side-nav.service';

describe('ToggleSideNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToggleSideNavService]
    });
  });

  it('should be created', inject([ToggleSideNavService], (service: ToggleSideNavService) => {
    expect(service).toBeTruthy();
  }));
});
