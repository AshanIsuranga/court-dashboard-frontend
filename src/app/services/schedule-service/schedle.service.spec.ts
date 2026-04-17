import { TestBed } from '@angular/core/testing';

import { SchedleService } from './schedle.service';

describe('SchedleService', () => {
  let service: SchedleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
