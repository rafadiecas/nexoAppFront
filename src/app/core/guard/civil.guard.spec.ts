import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { civilGuard } from './civil.guard';

describe('usuarioGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => civilGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
