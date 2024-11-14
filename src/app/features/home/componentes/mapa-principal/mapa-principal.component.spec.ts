import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaPrincipalComponent } from './mapa-principal.component';

describe('MapaPrincipalComponent', () => {
  let component: MapaPrincipalComponent;
  let fixture: ComponentFixture<MapaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
