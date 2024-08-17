import { TestBed } from '@angular/core/testing';

import { RouteguardService } from './routeguard.service';

describe('RouteguardService', () => {
  let service: RouteguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
