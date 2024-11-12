import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparicionPrincipalComponent } from './desaparicion-principal.component';

describe('DesaparicionPrincipalComponent', () => {
  let component: DesaparicionPrincipalComponent;
  let fixture: ComponentFixture<DesaparicionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesaparicionPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesaparicionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
