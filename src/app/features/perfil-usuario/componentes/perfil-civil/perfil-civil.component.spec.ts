import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCivilComponent } from './perfil-civil.component';

describe('PerfilCivilComponent', () => {
  let component: PerfilCivilComponent;
  let fixture: ComponentFixture<PerfilCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
