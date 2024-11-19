import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDesaparicionComponent } from './crear-desaparicion.component';

describe('CrearDesaparicionComponent', () => {
  let component: CrearDesaparicionComponent;
  let fixture: ComponentFixture<CrearDesaparicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDesaparicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDesaparicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
