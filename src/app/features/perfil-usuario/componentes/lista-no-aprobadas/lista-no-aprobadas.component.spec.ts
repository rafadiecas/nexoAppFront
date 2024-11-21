import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNoAprobadasComponent } from './lista-no-aprobadas.component';

describe('ListaNoAprobadasComponent', () => {
  let component: ListaNoAprobadasComponent;
  let fixture: ComponentFixture<ListaNoAprobadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNoAprobadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNoAprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
