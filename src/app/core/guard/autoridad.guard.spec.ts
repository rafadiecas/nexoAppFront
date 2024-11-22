import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autoridadGuard } from './autoridad.guard';

describe('autoridadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autoridadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
