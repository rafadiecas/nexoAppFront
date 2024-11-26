import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesaparicionesEliminadasComponent } from './lista-desapariciones-eliminadas.component';

describe('ListaDesaparicionesEliminadasComponent', () => {
  let component: ListaDesaparicionesEliminadasComponent;
  let fixture: ComponentFixture<ListaDesaparicionesEliminadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDesaparicionesEliminadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDesaparicionesEliminadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
