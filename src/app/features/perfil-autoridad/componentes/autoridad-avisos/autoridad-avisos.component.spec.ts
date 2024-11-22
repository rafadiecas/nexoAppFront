import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadAvisosComponent } from './autoridad-avisos.component';

describe('AutoridadAvisosComponent', () => {
  let component: AutoridadAvisosComponent;
  let fixture: ComponentFixture<AutoridadAvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoridadAvisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
