import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPrincipalComponent } from './aviso-principal.component';

describe('AvisoPrincipalComponent', () => {
  let component: AvisoPrincipalComponent;
  let fixture: ComponentFixture<AvisoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
