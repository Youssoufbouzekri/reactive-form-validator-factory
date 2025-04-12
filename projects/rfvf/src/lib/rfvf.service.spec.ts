import { TestBed } from '@angular/core/testing';

import { RfvfService } from './rfvf.service';

describe('RfvfService', () => {
  let service: RfvfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfvfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
