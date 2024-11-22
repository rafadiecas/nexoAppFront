import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaDesaparicionAutoridadComponent } from './edita-desaparicion-autoridad.component';

describe('EditaDesaparicionAutoridadComponent', () => {
  let component: EditaDesaparicionAutoridadComponent;
  let fixture: ComponentFixture<EditaDesaparicionAutoridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaDesaparicionAutoridadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaDesaparicionAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
