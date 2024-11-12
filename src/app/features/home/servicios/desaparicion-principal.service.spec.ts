import { TestBed } from '@angular/core/testing';

import { DesaparicionPrincipalService } from './desaparicion-principal.service';

describe('DesaparicionPrincipalService', () => {
  let service: DesaparicionPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesaparicionPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
