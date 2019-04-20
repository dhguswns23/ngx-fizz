import { TestBed } from '@angular/core/testing';

import { FizzService } from './fizz.service';

describe('FizzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FizzService = TestBed.get(FizzService);
    expect(service).toBeTruthy();
  });
});
