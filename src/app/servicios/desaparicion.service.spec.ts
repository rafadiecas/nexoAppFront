import { TestBed } from '@angular/core/testing';

import { DesaparicionService } from './desaparicion.service';

describe('DesaparicionPrincipalService', () => {
  let service: DesaparicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesaparicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
