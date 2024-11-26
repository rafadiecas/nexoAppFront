import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosPaginaComponent } from './avisos-pagina.component';

describe('AvisosPaginaComponent', () => {
  let component: AvisosPaginaComponent;
  let fixture: ComponentFixture<AvisosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisosPaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
