import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPerfilAutoridadComponent } from './menu-perfil-autoridad.component';

describe('MenuPerfilAutoridadComponent', () => {
  let component: MenuPerfilAutoridadComponent;
  let fixture: ComponentFixture<MenuPerfilAutoridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPerfilAutoridadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPerfilAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
