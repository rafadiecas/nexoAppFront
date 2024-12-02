import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAutoridadComponent } from './crear-autoridad.component';

describe('CrearAutoridadComponent', () => {
  let component: CrearAutoridadComponent;
  let fixture: ComponentFixture<CrearAutoridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAutoridadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
