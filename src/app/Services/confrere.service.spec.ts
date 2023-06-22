import { TestBed } from '@angular/core/testing';

import { ConfrereService } from './confrere.service';

describe('ConfrereService', () => {
  let service: ConfrereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfrereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
