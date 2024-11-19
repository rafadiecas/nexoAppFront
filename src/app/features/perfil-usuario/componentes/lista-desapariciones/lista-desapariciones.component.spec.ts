import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesaparicionesComponent } from './lista-desapariciones.component';

describe('ListaDesaparicionesComponent', () => {
  let component: ListaDesaparicionesComponent;
  let fixture: ComponentFixture<ListaDesaparicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDesaparicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDesaparicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
