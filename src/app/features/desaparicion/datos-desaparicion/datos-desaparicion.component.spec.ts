import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDesaparicionComponent } from './datos-desaparicion.component';

describe('DatosDesaparicionComponent', () => {
  let component: DatosDesaparicionComponent;
  let fixture: ComponentFixture<DatosDesaparicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDesaparicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDesaparicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
