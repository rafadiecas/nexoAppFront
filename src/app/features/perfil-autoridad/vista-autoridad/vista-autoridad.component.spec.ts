import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAutoridadComponent } from './vista-autoridad.component';

describe('VistaAutoridadComponent', () => {
  let component: VistaAutoridadComponent;
  let fixture: ComponentFixture<VistaAutoridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaAutoridadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
