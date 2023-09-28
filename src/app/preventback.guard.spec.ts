import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventbackGuard } from './preventback.guard';

describe('preventbackGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventbackGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
